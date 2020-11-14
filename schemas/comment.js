const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const commentSchema = new Schema({
  numId: {
    type: Number,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);
