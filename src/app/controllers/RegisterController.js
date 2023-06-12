const users = require("../models/User");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { param } = require("express/lib/request");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const siteController = require("./SiteController");
const { log } = require("console");

class RegisterController {
  show(req, res, next) {
    var token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
    }
    res.sendFile(path.join(__dirname, "../../views/register.html"));
  }
  register(req, res, next) {
    const user = new users({
      ...req.body,
      avatar_img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
      phoneNumber: `Bạn chưa liên kết số điện thoại`,
      role: `member`,
      address: `Chưa cập nhật`,
      dob: `Chưa cập nhật`,
      gender: `Chưa cập nhật`,
    });
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        console.log(err);
        return;
      }
      user.password = hash;
      user
        .save()
        .then(() => res.redirect("/login"))
        .catch(function (error) {
          if (error.code === 11000) {
            return res.json("user got duplicated");
          } else return res.json(error);
        });
    });
  }
}

module.exports = new RegisterController();
