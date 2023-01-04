require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const register = require("./models/register");
require("./config/database").connect();

const app = express();
app.use(cors());

//file upload

const saltedMd5 = require("salted-md5");

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.urlencoded());
app.use(express.json());
// const Storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: Storage,
// });

// app.use("/profile", express.static("upload/images"));

// app.post("/upload/:id", upload.single("recfile"), async (req, res) => {
//   try {
//     const updatepic = await register.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           profile_pic: `http://localhost:7000/profile/${req.file.filename}`,
//         },
//       },
//       { new: true }
//     );

//     res.send(updatepic);
//   } catch (error) {
//     res.next(error);
//   }
// });

//firebase
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-project-1-58a04.firebaseio.com",
  storageBucket: process.env.BUCKET_URL,
});
app.locals.bucket = admin.storage().bucket();
let db = admin.firestore();

let a = db.collection("users");

app.post("/upload/:id", upload.single("recfile"), async (req, res) => {
  const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
  const fileName = name + path.extname(req.file.originalname);
  await app.locals.bucket
    .file(fileName)
    .createWriteStream()
    .end(req.file.buffer);

  const updatepic = await register.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        profile_pic: `https://firebasestorage.googleapis.com/v0/b/mnv-frontend.appspot.com/o/${fileName}?alt=media`,
      },
    },
    { new: true }
  );

  res.send(updatepic);
});

app.use(express.json());
module.exports = app;
