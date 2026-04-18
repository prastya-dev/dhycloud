const bcrypt = require('bcrypt')
const prisma = require('../prisma') // pastikan ini sudah kamu buat

const authController = async (req, res) => {
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

module.exports = { authController }