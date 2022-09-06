const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
class SiteController {
    // [GET] /
    index(req, res, next) {
        Book.find({}).sort({
            createdAt : -1,
        })
            .then((books) => {
                var token = req.cookies.token;
                var result = jwt.verify(token, 'mk')
                console.log(result);
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
            })
            .catch(next);
    }
    showVietNamBooks(req, res, next) {
        Book.find({
            catelogy : "Sách Tiếng Việt"
        })
            .then((books) => {  
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
                
            })
            .catch(next);
    }
    showEnglishBooks(req, res, next) {
        Book.find({
            catelogy : "Sách Tiếng Anh"
        })
            .then((books) => {  
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
            })
            .catch(next);
    }
    showAbilitiesBooks(req, res, next) {
        Book.find({
            catelogy : "Sách kĩ năng sống"
        })
            .then((books) => {  
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
            })
            .catch(next);
    }
    showDetectiveBooks(req, res, next) {
        Book.find({
            catelogy : "Truyện trinh thám"
        })
            .then((books) => {  
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
            })
            .catch(next);
    }
    showComicBooks(req, res, next) {
        Book.find({
            catelogy : "Truyện tranh"
        })
            .then((books) => {  
                res.render('home',{
                    books: mutipleMongooseToObject(books),
                })
            })
            .catch(next);
    }
}

module.exports = new SiteController();