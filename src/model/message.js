const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
