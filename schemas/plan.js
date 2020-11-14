const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const planSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  curCount: {
    type: Number
  }
});

module.exports = mongoose.model("Plan", planSchema);
