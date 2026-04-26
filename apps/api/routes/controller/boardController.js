const prisma = require('../../lib/prisma')

// GET /api/boards — ambil semua board milik user
const getBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      where: {
        OR: [
          { ownerId: req.user.id },
          { members: { some: { userId: req.user.id } } }
        ]
      },
      include: {
        owner: { select: { id: true, name: true} },
        _count: { select: { lists: true, members: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ data: boards })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/boards/:id — detail board + semua list + card
const getBoardById = async (req, res) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: req.params.id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        members: {
          include: { user: { select: { id: true, name: true, email: true } } }
        },
        lists: {
          orderBy: { position: 'asc' },
          include: {
            cards: {
              orderBy: { position: 'asc' },
              include: { links: true }
            }
          }
        }
      }
    })

    if (!board) {
      return res.status(404).json({ message: 'Board tidak ditemukan' })
    }

    // cek apakah user punya akses
    const isOwner = board.ownerId === req.user.id
    const isMember = board.members.some(m => m.userId === req.user.id)

    if (!isOwner && !isMember) {
      return res.status(403).json({ message: 'Tidak punya akses ke board ini' })
    }

    res.json({ data: board })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/boards — buat board baru
const createBoard = async (req, res) => {
  try {
    const { title } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Judul board wajib diisi' })
    }

    const board = await prisma.board.create({
      data: {
        title: title.trim(),
        ownerId: req.user.id,
        // otomatis buat 3 list default
        lists: {
          create: [
            { title: 'To Do',    position: 0 },
            { title: 'On Going', position: 1 },
            { title: 'Finish',   position: 2 }
          ]
        }
      },
      include: {
        lists: true
      }
    })

    res.status(201).json({ data: board })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/boards/:id — update judul board
const updateBoard = async (req, res) => {
  try {
    const { title } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Judul board wajib diisi' })
    }

    const board = await prisma.board.findUnique({
      where: { id: req.params.id }
    })

    if (!board) {
      return res.status(404).json({ message: 'Board tidak ditemukan' })
    }

    if (board.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Hanya owner yang bisa edit board' })
    }

    const updated = await prisma.board.update({
      where: { id: req.params.id },
      data: { title: title.trim() }
    })

    res.json({ data: updated })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/boards/:id
const deleteBoard = async (req, res) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: req.params.id }
    })

    if (!board) {
      return res.status(404).json({ message: 'Board tidak ditemukan' })
    }

    if (board.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Hanya owner yang bisa hapus board' })
    }

    await prisma.board.delete({ where: { id: req.params.id } })

    res.json({ message: 'Board berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getBoards, getBoardById, createBoard, updateBoard, deleteBoard }