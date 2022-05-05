const mongoose = require("mongoose");
const sentMessageSchema = new mongoose.Schema({
  to_email: {
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
  sent_at: {
    type: String,
    default: Date.now(),
  },
});

const SentMessage = mongoose.model("sentMessage", sentMessageSchema);
module.exports = SentMessage;
