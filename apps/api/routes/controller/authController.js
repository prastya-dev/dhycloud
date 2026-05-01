const bcrypt = require('bcrypt')
const prisma = require('../../lib/prisma')
const jwt = require('jsonwebtoken')

const regist = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    const { password: _, ...userSafe } = user
    res.status(201).json({ message: 'User berhasil dibuat', data: userSafe })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getProfile = (req, res) => {
  try {
    return res.json({ message: 'Data user dari token', data: req.user })
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ message: 'Email tidak boleh kosong' })
    if (!password) return res.status(400).json({ message: 'Password tidak boleh kosong' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'Email tidak terdaftar' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Password salah' })

    // ✅ FIX 1: Access token 1 jam (bukan 10 menit)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // ✅ FIX 2: Refresh token 30 hari (bukan 7 hari)
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30d' }
    )

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        // ✅ FIX 3: expiresAt ikut 30 hari
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    return res.json({ accessToken, refreshToken })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token tidak ada' })
    }

    // cek di DB
    const existing = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }  // ✅ include user untuk ambil data lengkap
    })

    if (!existing) {
      return res.status(403).json({ message: 'Token tidak valid' })
    }

    // ✅ FIX 4: Cek apakah token sudah expired di DB
    if (existing.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token: refreshToken } })
      return res.status(403).json({ message: 'Refresh token expired, silakan login ulang' })
    }

    // verify JWT signature
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    // ✅ FIX 5: Hapus token lama (rotate!)
    await prisma.refreshToken.delete({ where: { token: refreshToken } })

    // ✅ FIX 6: Buat access token baru dengan data lengkap
    const newAccessToken = jwt.sign(
      { id: existing.user.id, email: existing.user.email, name: existing.user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // ✅ FIX 7: Buat refresh token BARU (rotate)
    const newRefreshToken = jwt.sign(
      { id: existing.user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30d' }
    )

    // ✅ FIX 8: Simpan refresh token baru ke DB
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: existing.user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    // ✅ FIX 9: Kirim KEDUA token (bukan hanya accessToken)
    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })

  } catch (error) {
    // JWT verify gagal (tampered/expired)
    return res.status(403).json({ message: 'Token expired / invalid' })
  }
}

module.exports = { regist, login, getProfile, refresh }