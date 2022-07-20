const users = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const siteController = require('./SiteController');
const { log } = require('console');

class RegisterController {
    show (req, res, next){
        var token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
        }
        res.sendFile(path.join(__dirname, '../../views/register.html'));
    }
   register(req, res, next){
        const user = new users(req.body);
        bcrypt.hash(user.password, 10, function(err, hash){
            if (err) {
                console.log(err);
                return;
            }
            user.password = hash;
            console.log(hash);
            console.log(user.password);
                    user
            .save()
            .then(() => res.redirect('/login'))
            .catch( function () { 
                return res.json('user got duplicated')
            });
        });

   }
}

module.exports = new RegisterController();