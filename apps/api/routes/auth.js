const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek user
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(400).json({ message: 'Email already used' });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // generate subdomain otomatis
    const subdomain = email.split('@')[0];

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        subdomain
      }
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//loginn
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;