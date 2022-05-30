const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    show (req, res, next){
        res.render('users/show')
    }
}

module.exports = new MeController();