const express = require('express');
const router = express.Router();
const suspectRouter = require('./modules/suspect');

router.get('/', (req, res) => {
  return 'hello'
})
router.use('/suspect', suspectRouter);

module.exports = router;
