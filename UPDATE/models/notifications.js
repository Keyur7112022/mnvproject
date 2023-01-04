const mongoose = require("mongoose");

const { Schema } = mongoose;

const Notifications = new Schema({
  user: {
    type: Array,
  },
  notificationmsg: {
    type: String,
  },
  date: {
    type: Date,
  },
  read: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("notification", Notifications);
