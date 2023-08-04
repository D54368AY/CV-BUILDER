const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const userModel = require("../db/userSchema");
const resumeModel = require("../db/resumeSchema");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getMaxListeners } = require("process");

router.post("/addresume", (req, res) => {
  console.log(req.body);
  let ins = new resumeModel({
    user_id: req.body.userid,
    basic_detail: req.body.basicdetail_data,
    education: req.body.education_data,
    experience: req.body.experience_data,
    projects: req.body.projects_data,
    skills: req.body.skills_data,
  });
  console.log(ins);
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.json({ err: 1, msg: "Data Not inserted in Resume Table" });
    } else {
      res.json({ err: 0, msg: "Your Resume Successfully Created" });
    }
  });
});

router.post("/updateresume", (req, res) => {
  resumeModel.updateOne(
    { _id: req.body.resumeid },
    {
      $set: {
        basic_detail: req.body.basicdetail_data,
        education: req.body.education_data,
        experience: req.body.experience_data,
        projects: req.body.projects_data,
        skills: req.body.skills_data,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res.json({ err: 1, msg: "Data Not updated" });
      } else {
        console.log("updated");
        res.json({ err: 0, msg: "Your Resume Successfully updated" });
      }
    }
  );
});

router.post("/getallresume", (req, res) => {
  console.log(req.body);
  resumeModel.find({ user_id: req.body.userid }, (err, data) => {
    if (data) {
      res.json({ err: 0, allresumes: data });
    } else {
      res.json({ err: 1, msg: "No Data Found" });
    }
  });
});

router.post("/getcurrentresume", (req, res) => {
  console.log(req.body);
  resumeModel.find({ _id: req.body.resumeid }, (err, data) => {
    if (data[0]) {
      console.log(data[0]);
      res.json({ err: 0, resume: data });
    } else {
      res.json({ err: 1, msg: "No Data Found" });
    }
  });
});

router.post("/delresume", (req, res) => {
  console.log(req.body);
  resumeModel.deleteOne({ _id: req.body.resumeid }, (err) => {
    if (!err) {
      res.json({ err: 0, msg: "Successfully Deleted" });
    } else {
      console.log(err);
      res.json({ err: 1, msg: "Cannot Delete The Resume" });
    }
  });
});

module.exports = router;
