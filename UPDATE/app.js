require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;
require("./config/database").connect();

const app = express();
app.use(cors());

const Storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: maxSize },
});

app.use("/profile", express.static("upload/images"));

app.post("/upload", upload.single("recfile"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    profile_url: `http://localhost:7000/profile${req.file.filename}`,
  });
});

app.use(express.json());
module.exports = app;
