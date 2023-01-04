const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChecklistSchema = new Schema({
  taskName: {
    type: String,
  },
  taskType: {
    type: String,
    optional: ["Checkbox", "Employee Information", "File upload"],
  },
  addMember: {
    type: Array,
  },
  DueDate: { type: Date },
  Description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Completed",
  },
  statusType: {
    type: String,
    default: "danger",
  },
});
module.exports = mongoose.model("toDo", ChecklistSchema);
