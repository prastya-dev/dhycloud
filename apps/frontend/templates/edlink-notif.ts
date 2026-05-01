import api from '@/lib/axios'

interface EdlinkNotif {
  id: number
  description: string
  createdAt: number
  group: { id: number; name: string }
  post: { id: number; title: string; type: string }
  triggerUser: { name: string }
}

type StatusCallback = (status: string) => void

const getWeekRange = () => {
  const now = new Date()
  const day = now.getDay()

  const diffToMonday = day === 0 ? -6 : 1 - day
  const thisMonday = new Date(now)
  thisMonday.setDate(now.getDate() + diffToMonday)
  thisMonday.setHours(0, 0, 0, 0)

  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)

  const thisSunday = new Date(thisMonday)
  thisSunday.setDate(thisMonday.getDate() + 6)
  thisSunday.setHours(23, 59, 59, 999)

  return { monday: lastMonday, sunday: thisSunday }
}

const fetchNotifs = async (token: string): Promise<EdlinkNotif[]> => {
  const res = await fetch('/api/proxy/edlink', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token.trim() })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || `Error ${res.status}`)
  }

  const json = await res.json()
  return json?.data?.data ?? []
}

const promptToken = (message?: string): string => {
  const token = window.prompt(
    message || '🔑 Masukkan token Edlink kamu:\n\n(DevTools → Network → Authorization → hapus "Bearer ")'
  )
  if (!token?.trim()) throw new Error('Token tidak diisi')
  return token.trim()
}

// ✅ Update templateToken di board
const updateBoardToken = async (boardId: string, token: string): Promise<void> => {
  await api.patch(`/boards/${boardId}/token`, { token })
}

const filterAndGroup = (notifs: EdlinkNotif[]) => {
  const { monday, sunday } = getWeekRange()

  const filtered = notifs.filter(n => {
    const date = new Date(n.createdAt)
    return date >= monday && date <= sunday
  })

  if (!filtered.length) throw new Error('Tidak ada notifikasi minggu ini')

  const grouped: Record<string, { groupName: string; items: EdlinkNotif[] }> = {}
  filtered.forEach(n => {
    const key = String(n.group.id)
    if (!grouped[key]) grouped[key] = { groupName: n.group.name, items: [] }
    const exists = grouped[key].items.find(i => i.post.id === n.post.id)
    if (!exists) grouped[key].items.push(n)
  })

  return Object.values(grouped)
}

// =========================
// 🚀 IMPORT PERTAMA
// =========================
export const runEdlinkNotif = async (
  boardId: string,
  onStatus: StatusCallback
): Promise<void> => {
  // ✅ Minta token saat create
  const token = promptToken()

  onStatus('Menyimpan token...')
  // ✅ Simpan token langsung ke board
  await updateBoardToken(boardId, token)

  onStatus('Mengambil data dari Edlink...')
  const notifs = await fetchNotifs(token)
  if (!notifs.length) throw new Error('Tidak ada notifikasi')

  const groups = filterAndGroup(notifs)

  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 2)

  let current = 0
  for (const { groupName, items } of groups) {
    current++
    onStatus(`Membuat list ${current}/${groups.length}: ${groupName}`)

    const listRes = await api.post('/lists', { title: groupName, boardId })
    const listId = listRes.data.data.id

    for (const item of items) {
      const typeLabel = item.post.type === 'Z' ? '📝 Quiz' : '📚 Materi'
      await api.post('/cards', {
        title: item.group.name,
        description: `[${typeLabel}] • ${item.post.title} #postId:${item.post.id}`,
        listId,
        dueDate: deadline.toISOString()
      })
    }
  }

  onStatus('Import selesai!')
}

// =========================
// 🔄 REFRESH
// =========================
export const refreshEdlinkNotif = async (
  boardId: string,
  existingLists: any[],
  boardToken: string | null,
  onStatus: StatusCallback
): Promise<void> => {

  let token = boardToken

  // ✅ Kalau tidak ada token → minta via popup → simpan ke board
  if (!token) {
    onStatus('Token tidak ditemukan, meminta input...')
    token = promptToken('🔑 Token tidak ditemukan.\nMasukkan token Edlink kamu:')
    await updateBoardToken(boardId, token)
  }

  onStatus('Mengambil data dari Edlink...')

  let notifs: EdlinkNotif[] = []
  try {
    notifs = await fetchNotifs(token)
  } catch (err: any) {
    // ✅ Token expired/invalid → minta token baru → simpan ke board
    const isAuthError = err.message?.includes('401') ||
      err.message?.includes('403') ||
      err.message?.includes('invalid') ||
      err.message?.includes('expired')

    if (isAuthError) {
      onStatus('Token expired, meminta token baru...')
      token = promptToken('🔑 Token expired atau tidak valid.\nMasukkan token Edlink yang baru:')
      await updateBoardToken(boardId, token)
      notifs = await fetchNotifs(token)
    } else {
      throw err
    }
  }

  if (!notifs.length) throw new Error('Tidak ada notifikasi')

  const groups = filterAndGroup(notifs)

  // ✅ Kumpulkan postId yang sudah ada di semua list
  const existingPostIds = new Set<number>()
  existingLists.forEach(list => {
    list.cards?.forEach((card: any) => {
      const match = card.description?.match(/#postId:(\d+)/)
      if (match) existingPostIds.add(Number(match[1]))
    })
  })

  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 2)

  let newCount = 0

  for (const { groupName, items } of groups) {
    onStatus(`Mengecek ${groupName}...`)

    // Cari list existing atau buat baru
    let listId: string
    const existingList = existingLists.find(l => l.title === groupName)
    if (existingList) {
      listId = existingList.id
    } else {
      const listRes = await api.post('/lists', { title: groupName, boardId })
      listId = listRes.data.data.id
    }

    for (const item of items) {
      // ✅ Skip kalau postId sudah ada (walau sudah pindah list)
      if (existingPostIds.has(item.post.id)) continue

      const typeLabel = item.post.type === 'Z' ? '📝 Quiz' : '📚 Materi'
      await api.post('/cards', {
        title: item.group.name,
        description: `[${typeLabel}] • ${item.post.title} #postId:${item.post.id}`,
        listId,
        dueDate: deadline.toISOString()
      })

      existingPostIds.add(item.post.id)
      newCount++
    }
  }

  onStatus(newCount > 0 ? `✅ ${newCount} data baru ditambahkan!` : 'Tidak ada data baru')
}