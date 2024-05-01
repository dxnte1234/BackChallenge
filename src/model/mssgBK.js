const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {timestamps: true
  }
)
const Messages = mongoose.model('message', messageSchema)

module.exports = Messages