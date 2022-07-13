const users = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');

const siteController = require('./SiteController');

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
        user
            .save()
            .then(() => res.redirect('/login'))
            .catch( function () { 
                return res.json('user got duplicated')
   });
   }
}

module.exports = new RegisterController();