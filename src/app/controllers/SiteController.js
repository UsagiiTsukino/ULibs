const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Book.find({})
            .then((Books) => {  
                res.render('home',{
                    Books: mutipleMongooseToObject(Books),
                })
            })
            .catch(next);
    }
    // getBookList(){
    //     return BookList;
    // }
    // [GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new SiteController();