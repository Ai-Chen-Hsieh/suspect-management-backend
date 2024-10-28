const express = require('express');
const router = express.Router();
const suspectRouter = require('./modules/suspect');

// 測試
router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/suspect', suspectRouter);

module.exports = router;
