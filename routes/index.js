const express = require('express');
const router = express.Router();
const suspectRouter = require('./modules/suspect');

router.use('/suspect', suspectRouter);

module.exports = router;
