const mongoose = require('mongoose')

const TodosShema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }
)

module.exports = mongoose.model('Todos', TodosShema)