const express = require('express');
const router = express.Router();
const Suspect = require('../../model/suspect');
router.get('/', (req, res) => {
  console.log("Incoming request to /suspects");
  Suspect.find()
    .lean()
    .then((suspects) => {
      res.json(suspects);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
