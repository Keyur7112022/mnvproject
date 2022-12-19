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
    type: String,
    required: "Email address is required!",
  },
  DueDate: { type: String, required: true },
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
});
module.exports = mongoose.model("toDo", ChecklistSchema);
