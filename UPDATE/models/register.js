const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
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
  },
  department: {
    type: String,
  },
  position: {
    type: String,
    default: "MediaNV",
  },
  manager: {
    type: String,
    default: "Jay Dalal",
  },
  token: {
    type: String,
    default: "",
  },
  temp: {
    type: String,
    default: "",
  },
  office: {
    type: String,
    default: "Ahmedabad",
  },
  Info: {
    Gender: { type: String, default: "" },
    DOB: { type: Date, default: "" },
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
  profile_pic: {
    type: String,
    default: "",
  },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", registerSchema);
