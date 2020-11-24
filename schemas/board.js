const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const boardSchema = new Schema({
  numId: {
    type: Number,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imgPath: {
    type: String
  },
  views: {
    type: Number,
    default: Number(0)
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Board", boardSchema);
