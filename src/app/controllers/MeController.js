const Book = require('../models/Book');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const fileUploader = require('../../config/cloudinary.config');
class MeController {
    show (req, res, next){
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk')
            if(result) {
                User.findOne({_id: result._id})
                    .then(user => {
                        res.render('users/show', {
                            user: mongooseToObject(user)
                        })
                    })
                    .catch(err => console.log(err))
            }
        } catch (error) {
            console.log(error);
        }
    }
    update (req, res, next){

        var displayName = req.body.displayName;
        var dob = req.body.dob;
        var gender = req.body.gender;
        var id = req.body.id;
        var address = req.body.address;
        var avatar_img = req.file.path;

        if (!req.file) {
            console.log("No File");
            return;
          }
        User.updateOne(
            {
                _id : id
            },
            {
                displayName,
                dob,
                gender,
                address,
                // avatar_img,
            })
            .then(() => {
                res.json({
                    success : true,
            })})
            .catch(err => {
                console.log(err);
            });
    }
    cart (req, res, next){
        res.render('cart')
    }
    payment (req, res, next){

        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk')
            if(result) {
                User.findOne({_id: result._id})
                    .then(user => {
                        res.render('payment', {
                            user: mongooseToObject(user)
                        })
                    })
                    .catch(err => console.log(err))
            }
        } catch (error) {
            console.log(error);
        }
    }
    payment_success (req, res, next) {
        res.render('payment_success')
    }
}

module.exports = new MeController();