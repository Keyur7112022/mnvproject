const mongoose = require("mongoose");
const { Schema } = mongoose;

const Time_of_Schema = new Schema({
  SelectType: {
    type: String,
    optional: ["sickleave", "unpaid"],
    required: "Select the type of leave!",
  },
  Leaves: {
    type: String,
    optional: ["Single", "Multiple"],
    message: "Select the day.!",
  },
  SelectDate: { type: String, required: "Select the start Date!" },
  Note: { type: String },
  AddMember: { type: String, required: "Email address is required!" },
  status: {
    type: String,
    default: "Pending",
    optional: ["PENDING", "APPROVED", "REJECTED"],
  },
  user: {
    type: String,
  },
  statusType: {
    type: String,
    default: "warning",
  },
});
module.exports = mongoose.model("leave", Time_of_Schema);
