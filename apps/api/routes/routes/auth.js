const express = require("express");
const router = express.Router();
const { regist, login, getProfile, refresh } = require('../controller/authController');
const { authenticate } = require("../middleware/authMiddleware");
 router.get('/', (req, res) => {
  res.json({ message: 'auth endpoin' })
})

router.post('/regist',regist)
router.post('/login',login)

router.use(authenticate);
router.get('/me',getProfile)
router.post('/getaccess', refresh)

module.exports = router;