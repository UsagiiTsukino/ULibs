const users = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const siteController = require('./SiteController');

class LoginController {
    show (req, res, next){
        var token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
        }
        res.sendFile(path.join(__dirname, '../../views/login.html'));
    }
    authenticate(req, res, next) {

        var username = req.body.username
        var password = req.body.password
        var email = req.body.email

            users.findOne({ 
                username: username, 
                email: email,
            })
                .then(data => {
                    console.log(data);
                    if(data){
                        bcrypt.compare(password, data.password).then(function(result) {
                            if (result){
                                var token =  jwt.sign({
                                        _id : data._id,
                                    }, 'mk')
                                return res.json({
                                    success : true,
                                    token : token,
                                })
                            }
                            else return res.json({
                                success : false,
                            })
                        });      
                    }
                    else return res.json('that bai')
                })
                .catch(err => {
                    res.status(500).json({ error: 'loi server'})
                })

        }
    checkAuth(req, res, next) {
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk') || req.cookies.connect.sid;
            if(result){
                next()
            }
        } catch (error) {
            return res.redirect('/login')
        }


    }
    accepted(req, res, next) {
        res.json('Welcome')
    }
}

module.exports = new LoginController();