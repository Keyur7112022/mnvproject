const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: true,
  },
  fullName: {
    type: String,
    Required: "Please enter the full name",
  },
  email: {
    type: String,
    Required: "enter the valid email Id ",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  headquaters: {
    office: {
      type: Array,
      value: String,
      label: "label"
    },
    department: {
      type: Array,
      value: "String",
      label: "label"
    }
  }
});

module.exports = mongoose.model("Admin", adminSchema);
