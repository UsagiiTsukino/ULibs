const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    show (req, res, next){
        res.render('users/show')
    }
    cart (req, res, next){
        res.render('cart')
    }
    payment (req, res, next){
        res.render('payment')
    }
}

module.exports = new MeController();