const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authMiddleware')
const {
  createCard,
  getCard,
  updateCard,
  deleteCard,
  addLink,
  deleteLink
} = require('../controller/cardConstroller');

router.use(authenticate)

router.post('/',                          createCard)
router.get('/:id',                        getCard)
router.put('/:id',                        updateCard)
router.delete('/:id',                     deleteCard)
router.post('/:id/links',                 addLink)
router.delete('/:cardId/links/:linkId',   deleteLink)

module.exports = router