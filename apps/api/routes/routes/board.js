const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authMiddleware')
const {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  saveTemplateToken
} = require('../controller/boardController')

router.use(authenticate) // semua route board butuh login

router.get('/',     getBoards)
router.get('/:id',  getBoardById)
router.post('/',    createBoard)
router.put('/:id',  updateBoard)
router.patch('/:id/token', saveTemplateToken)  // ✅ tambah
router.delete('/:id', deleteBoard)

module.exports = router