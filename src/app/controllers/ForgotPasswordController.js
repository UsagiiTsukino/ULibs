
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const mailer = require('../../util/mailler');
const bcrypt = require('bcrypt');
const mlt = require('../../util/otp.mailler-template');

const rn = require('random-number');
var OTP;
const options = {
  min:  100000
, max:  999999
, integer: true
}
class ForgotPasswordController {
    show (req, res, next){
        var token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
        }
        res.sendFile(path.join(__dirname, '../../views/forgot_password.html'));
    }
    find(req, res, next) {
        const email = req.body.email;
        const sending_otp = req.body.otp;
        const newPassword = req.body.password;
        if(req.body.code === 'email'){
            Users.findOne({ email: email })
                .then(data => {
                    if (data) {
                        OTP = rn(options)
                        mailer.sendMail(
                            email,
                        'Yêu cầu đổi mật khẩu',
                        mlt.mailContent(OTP),
                        )
                        res.json({message: true})
                    }
                    else res.json({message: false})
                })
                .catch(err => res.json({message : err}))
            }
        if (req.body.code === 'otp'){
            let check = sending_otp == ('' + OTP)
            res.json({message: check})
        }
        if(req.body.code === 'new-password'){
            bcrypt.hash(newPassword, 10, function(err, hash_password) {
                if (err) {
                    console.log(err);
                    return;
                }
                Users.findOneAndUpdate({
                    email
                },
                {
                    password: hash_password,
                },
                {
                    new : true,
                })
                .then(data => {
                    var token =  jwt.sign({
                        _id : data._id,
                    }, 'mk')
                    res.json({
                        message : !!data,
                        token,
                    })
            })
                .catch(console.log(err))
            });
        }
    }
}

module.exports = new ForgotPasswordController();