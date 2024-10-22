const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suspectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  riskLevel: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Suspect', suspectSchema)