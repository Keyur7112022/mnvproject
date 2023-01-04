const mongoose = require("mongoose");

const { Schema } = mongoose;

const NewsSchema = new Schema({
  title: {
    type: String,
  },
  eventDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  detail: {
    type: String,
  },
});
module.exports = mongoose.model("Events", NewsSchema);
