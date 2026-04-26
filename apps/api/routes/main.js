const express = require("express");
const router = express.Router();


const authRouter = require('./routes/auth');
const board = require('./routes/board');
const list = require('./routes/list');
const card = require('./routes/card');

router.use('/auth',authRouter);
router.use('/boards',board);
router.use('/list',list);
router.use('/card',card);

module.exports = router