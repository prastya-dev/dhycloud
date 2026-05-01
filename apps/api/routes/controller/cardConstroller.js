const prisma = require('../../lib/prisma')

// helper: cek user punya akses ke board via card -> list -> board
const checkCardAccess = async (cardId, userId) => {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: {
      list: {
        include: {
          board: { include: { members: true } }
        }
      }
    }
  })
  if (!card) return null

  const board = card.list.board
  const isOwner = board.ownerId === userId
  const isMember = board.members.some(m => m.userId === userId)
  if (!isOwner && !isMember) return null

  return card
}
const createCard = async (req, res) => {
  try {
    const { title, listId, description, dueDate } = req.body  // ✅ tambah ini

    if (!title || !listId) {
      return res.status(400).json({ message: 'Title dan listId wajib diisi' })
    }

    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: { board: { include: { members: true } } }
    })

    if (!list) return res.status(404).json({ message: 'List tidak ditemukan' })

    const board = list.board
    const isOwner = board.ownerId === req.user.id
    const isMember = board.members.some(m => m.userId === req.user.id)
    if (!isOwner && !isMember) return res.status(403).json({ message: 'Akses ditolak' })

    const lastCard = await prisma.card.findFirst({
      where: { listId },
      orderBy: { position: 'desc' }
    })
    const position = lastCard ? lastCard.position + 1 : 0

    const card = await prisma.card.create({
      data: {
        title: title.trim(),
        listId,
        position,
        description: description?.trim() || null,                        // ✅ tambah
        dueDate: dueDate ? new Date(dueDate) : null                      // ✅ tambah
      },
      include: { links: true }                                           // ✅ tambah
    })

    res.status(201).json({ data: card })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/cards/:id — detail card + links
const getCard = async (req, res) => {
  try {
    const card = await checkCardAccess(req.params.id, req.user.id)
    if (!card) {
      return res.status(404).json({ message: 'Card tidak ditemukan atau akses ditolak' })
    }

    const detail = await prisma.card.findUnique({
      where: { id: req.params.id },
      include: { links: true }
    })

    res.json({ data: detail })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/cards/:id — update title, description, dueDate, pindah list
const updateCard = async (req, res) => {
  try {
    const { title, description, dueDate, listId } = req.body

    const card = await checkCardAccess(req.params.id, req.user.id)
    if (!card) {
      return res.status(404).json({ message: 'Card tidak ditemukan atau akses ditolak' })
    }

    // kalau pindah list, cek akses ke list tujuan
    if (listId && listId !== card.listId) {
      const targetList = await prisma.list.findUnique({
        where: { id: listId },
        include: { board: { include: { members: true } } }
      })
      if (!targetList) {
        return res.status(404).json({ message: 'List tujuan tidak ditemukan' })
      }
      const b = targetList.board
      const ok = b.ownerId === req.user.id || b.members.some(m => m.userId === req.user.id)
      if (!ok) return res.status(403).json({ message: 'Akses ke list tujuan ditolak' })
    }

    const updated = await prisma.card.update({
      where: { id: req.params.id },
      data: {
        ...(title       && { title: title.trim() }),
        ...(description !== undefined && { description }),
        ...(dueDate     !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
        ...(listId      && { listId })
      },
      include: { links: true }
    })

    res.json({ data: updated })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/cards/:id
const deleteCard = async (req, res) => {
  try {
    const card = await checkCardAccess(req.params.id, req.user.id)
    if (!card) {
      return res.status(404).json({ message: 'Card tidak ditemukan atau akses ditolak' })
    }

    await prisma.card.delete({ where: { id: req.params.id } })

    res.json({ message: 'Card berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/cards/:id/links — tambah link ke card
const addLink = async (req, res) => {
  try {
    const { url, label } = req.body

    if (!url) return res.status(400).json({ message: 'URL wajib diisi' })

    // validasi format URL
    try { new URL(url) } catch {
      return res.status(400).json({ message: 'Format URL tidak valid' })
    }

    const card = await checkCardAccess(req.params.id, req.user.id)
    if (!card) {
      return res.status(404).json({ message: 'Card tidak ditemukan atau akses ditolak' })
    }

    const link = await prisma.cardLink.create({
      data: {
        url,
        label: label?.trim() || null,
        cardId: req.params.id
      }
    })

    res.status(201).json({ data: link })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/cards/:cardId/links/:linkId — hapus link
const deleteLink = async (req, res) => {
  try {
    const card = await checkCardAccess(req.params.cardId, req.user.id)
    if (!card) {
      return res.status(404).json({ message: 'Card tidak ditemukan atau akses ditolak' })
    }

    const link = await prisma.cardLink.findUnique({
      where: { id: req.params.linkId }
    })

    if (!link || link.cardId !== req.params.cardId) {
      return res.status(404).json({ message: 'Link tidak ditemukan' })
    }

    await prisma.cardLink.delete({ where: { id: req.params.linkId } })

    res.json({ message: 'Link berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createCard, getCard, updateCard, deleteCard, addLink, deleteLink }