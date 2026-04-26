const bcrypt = require('bcrypt')
const prisma = require('../../lib/prisma') // pakai yang sudah dibuat
const jwt = require('jsonwebtoken')


const regist = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // validasi sederhana
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib' })
    }

    // cek user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    // jangan kirim password ke client
    const { password: _, ...userSafe } = user

    res.status(201).json({
      message: 'User berhasil dibuat',
      data: userSafe
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}





//get user

const getProfile = (req, res) => {
  try {
    return res.json({
      message: 'Data user dari token',
      data: req.user
    })
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}


//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ message: 'Email tidak boleh kosong' })
    if (!password) return res.status(400).json({ message: 'Password tidak boleh kosong' })

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Email tidak terdaftar' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' })
    }

    // 🔥 Access Token (10 menit)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    )

    // 🔥 Refresh Token (7 hari)
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    // simpan ke DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return res.json({
      accessToken,
      refreshToken
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
////






const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token tidak ada' })
    }

    // cek di DB
    const existing = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    })

    if (!existing) {
      return res.status(403).json({ message: 'Token tidak valid' })
    }

    // verify JWT
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    // 🔥 generate access token baru
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    )

    return res.json( accessToken )

  } catch (error) {
    return res.status(403).json({ message: 'Token expired / invalid' })
  }
}


module.exports = { regist, login, getProfile, refresh }