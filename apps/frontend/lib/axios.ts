import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

// ✅ Queue untuk handle race condition
let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (err: unknown) => void
}[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token!)
  })
  failedQueue = []
}

// Request interceptor — attach access token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — auto refresh kalau 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      // ✅ Kalau sedang refresh, antri dulu
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        }).catch(err => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) throw new Error('No refresh token')

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getaccess`,
          { refreshToken }
        )

        const { accessToken, refreshToken: newRefreshToken } = res.data

        // ✅ Simpan KEDUA token baru
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        // ✅ Proses request yang antri
        processQueue(null, accessToken)

        original.headers.Authorization = `Bearer ${accessToken}`
        return api(original)

      } catch (err) {
        // ✅ Gagal refresh → logout bersih
        processQueue(err, null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(err)

      } finally {
        // ✅ Reset flag apapun hasilnya
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api