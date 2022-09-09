
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');


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

        Users.findOne({ email: email })
            .then(data => {
                if (data) {
                    res.json({message: true})
                }
                else res.json({message: false})
            })
            .catch(err => res.json({message : err}))
    }
}

module.exports = new ForgotPasswordController();