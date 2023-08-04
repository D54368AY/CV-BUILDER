const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const userModel = require("../db/userSchema");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getMaxListeners } = require("process");

//storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:/Users/Neosoft/OneDrive/Desktop/CV-BUILDER/cv-builder/public/images/profile_pic"
    );
  },
  filename: (req, file, cb) => {
    const filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

//upload
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      req.fileValidationError = "Forbidden extension";
      cb(null, false, req.fileValidationError);
    }
  },
});

//jwt authentication
function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    console.log("token null");
    res.json({ err: 2, msg: "Token Does Not Match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        console.log("token expired");
        res.json({ err: 2, msg: "Token Expired ....Please Login Again" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

router.post("/adduser", (req, res) => {
  let firstname1 = req.body.fname;
  let lastname1 = req.body.lname;
  let email1 = req.body.email;
  let password1 = req.body.password;
  const hash = bcrypt.hashSync(password1, saltRounds);
  let p_no = req.body.phone;
  console.log("Hello");
  let ins = new userModel({
    firstname: firstname1,
    lastname: lastname1,
    email: email1,
    password: hash,
    phone_no: p_no,
  });
  console.log(ins);
  ins.save((err) => {
    if (err) {
      res.json({ err: 1, msg: "Not  registered due to Some internal issue" });
    } else {
      res.json({ err: 0, msg: `${firstname1}  is successfully registered` });
    }
  });
});
router.post("/loginuser", (req, res) => {
  let Email = req.body.email;
  let Password = req.body.password;
  userModel.find({ email: Email }, (err, data) => {
    if (!data[0]) {
      res.json({ err: 1, msg: "Entered Email Does Not Exist" });
    } else {
      if (bcrypt.compareSync(Password, data[0].password)) {
        console.log(data);
        let payload = { uid: data };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 6000 });
        console.log(token);
        res.json({ err: 0, msg: "User Login Successfully", token: token });
      } else {
        res.json({ err: 1, msg: "Password is Incorrect...Please Try Again" });
      }
    }
  });
});

router.post("/addpicture", upload.single("file"), (req, res) => {
  console.log(req.body.userid);
  /*  console.log(req.file.filename); */
  userModel.updateOne(
    { _id: req.body.userid },
    { $set: { profile_pic: req.file.filename } },
    (err) => {
      if (err) {
        console.log(err);
        res.json({ err: 1, msg: "Picture not uploaded" });
      } else {
        userModel.find({ _id: req.body.userid }, (err, data) => {
          if (data[0]) {
            let payload = { uid: data };
            console.log("picture uploaded");
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 6000 });
            res.json({
              err: 0,
              msg: "Picture uploaded Successfully",
              token: token,
            });
          }
        });
      }
    }
  );
});
module.exports = router;
