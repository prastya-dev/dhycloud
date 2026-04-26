const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authMiddleware')
const { createList, updateList, deleteList } = require('../controller/listController')

router.use(authenticate)

router.post('/',    createList)
router.put('/:id',   updateList)
router.delete('/:id', deleteList)

module.exports = router