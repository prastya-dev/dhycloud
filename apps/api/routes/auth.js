const express = require("express");
const router = express.Router();
const { authContrioller } = require('./controller/authController')
 router.get('/', (req, res) => {
  res.json({ message: 'auth endpoin' })
})

router.post('/regist',authContrioller)

module.exports = router;