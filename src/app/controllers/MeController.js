const Book = require('../models/Book');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
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
    cart (req, res, next){
        res.render('cart')
    }
    payment (req, res, next){
        res.render('payment')
    }
}

module.exports = new MeController();