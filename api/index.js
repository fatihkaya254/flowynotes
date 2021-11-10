import express from "express";
const app = express();
import mongoose from "mongoose";
import User from "./controllers/user";
import Log from "./middlewares/log";
import Multer from "multer";
import cors from "cors";
import Sharp from "sharp";
import fs from "fs";
import path from "path";

var corsOptions = {
  origin: process.env.OUR_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use("./static", express.static(path.join(__dirname, "static")));
const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};
const MAX_SIZE = 10000000;
const upload = Multer({
  dest: "./uploads",
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
});

mongoose
  .connect(
    process.env.OUR_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use('/*',Log.log)

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(201).json({ file: req.file });
});

app.post("/dropzone", upload.single("file"), async (req, res) => {
  console.log("request: ", req.body.who);
  var newName =
    Date.now() + "-" + req.body.who + path.extname(req.file.originalname);
  console.log(newName);
  try {
    await Sharp(req.file.path)
      .resize(300, 300, {
        fit: "cover",
        background: {
          r: 0,
          g: 0,
          b: 0,
          alpha: 0,
        },
      })
      //.background('white')
      //.embed()
      .toFile(`./static/${newName}`);
    fs.unlink(req.file.path, () => {
      res.status(200).json({ file: `/${newName}` });
    });
  } catch (err) {
    res.status(422).json({ err });
  }
});

app.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res
      .status(422)
      .json({ error: `Too Large. Max size is ${MAX_SIZE / 1000}kb` });
    return;
  }
});
//-------------------------------------------- USERS -------------------------------------------- //
app.post("/pass", User.authPass);
app.post("/changePass", User.changePass);
app.post("/authGoogle", User.authGoogle);
app.post("/auth", User.auth);
app.put("/updateProfile", User.update);
app.post("/addUser", User.newUser);

module.exports = {
  path: "/api",
  handler: app,
};
