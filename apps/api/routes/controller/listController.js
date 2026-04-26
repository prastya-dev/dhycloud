const prisma = require('../../lib/prisma')

// helper: cek user punya akses ke board
const checkBoardAccess = async (boardId, userId) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: { members: true }
  })
  if (!board) return null
  const isOwner = board.ownerId === userId
  const isMember = board.members.some(m => m.userId === userId)
  if (!isOwner && !isMember) return null
  return board
}

// POST /api/lists — buat list baru di sebuah board
const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body

    if (!title || !boardId) {
      return res.status(400).json({ message: 'Title dan boardId wajib diisi' })
    }

    const board = await checkBoardAccess(boardId, req.user.id)
    if (!board) {
      return res.status(403).json({ message: 'Board tidak ditemukan atau akses ditolak' })
    }

    // posisi otomatis di akhir
    const lastList = await prisma.list.findFirst({
      where: { boardId },
      orderBy: { position: 'desc' }
    })
    const position = lastList ? lastList.position + 1 : 0

    const list = await prisma.list.create({
      data: { title: title.trim(), boardId, position }
    })

    res.status(201).json({ data: list })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/lists/:id — update judul list
const updateList = async (req, res) => {
  try {
    const { title } = req.body

    const list = await prisma.list.findUnique({
      where: { id: req.params.id }
    })
    if (!list) return res.status(404).json({ message: 'List tidak ditemukan' })

    const board = await checkBoardAccess(list.boardId, req.user.id)
    if (!board) return res.status(403).json({ message: 'Akses ditolak' })

    const updated = await prisma.list.update({
      where: { id: req.params.id },
      data: { title: title.trim() }
    })

    res.json({ data: updated })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/lists/:id
const deleteList = async (req, res) => {
  try {
    const list = await prisma.list.findUnique({
      where: { id: req.params.id }
    })
    if (!list) return res.status(404).json({ message: 'List tidak ditemukan' })

    const board = await checkBoardAccess(list.boardId, req.user.id)
    if (!board) return res.status(403).json({ message: 'Akses ditolak' })

    await prisma.list.delete({ where: { id: req.params.id } })

    res.json({ message: 'List berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createList, updateList, deleteList }