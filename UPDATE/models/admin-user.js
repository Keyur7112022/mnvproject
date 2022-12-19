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
  number: {
    type: Number,
    default: "7845960132",
  },
  department: {
    type: String,
  },
  position: {
    type: String,
    default: "Software Developer",
  },
  manager: {
    type: String,
    default: "Jay Dalal",
  },
  token: {
    type: String,
  },
  office: {
    type: String,
    default: "Ahmedabad",
  },
  Info: {
    Gender: { type: String, default: "" },
    DOB: { type: String, default: "" },
    Address: {
      Address: { type: String, default: "" },
      City: { type: String, default: "" },
      Country: { type: String, default: "" },
      Postal: { type: String, default: "" },
    },

    Bank: {
      Bank_name: { type: String, default: "" },
      Account_name: { type: String, default: "" },
      Account_no: { type: Number, default: "" },
      Branch: { type: String, default: "" },
    },
  },
});

module.exports = mongoose.model("Admin", adminSchema);
