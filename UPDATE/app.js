require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const register = require("./models/register");
require("./config/database").connect();


const app = express();
app.use(cors());

const Storage = multer.diskStorage({

  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storageBucket: process.env.BUCKET_URL

});

app.use("/profile", express.static("upload/images"));

app.post("/upload/:id", upload.single("recfile"), async (req, res) => {
  try {
    const updatepic = await register.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          profile_pic: `http://localhost:7000/profile/${req.file.filename}`,
        },
      },
      { new: true }
    );
    res.send(updatepic);
  } catch (error) {
    res.next(error);
  }
});

app.use(express.json());
module.exports = app;
