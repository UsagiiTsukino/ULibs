const mongoose = require('mongoose');
const books = require("../models/Book");
const { mongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)
class BookController {
  
    // [GET] /search
    show(req, res, next) {
        books.findOne({
            slug : req.params.slug
        })
        .then(book => {
            res.render('books/show', {
                book : mongooseToObject(book)
            })
        })
        .catch(next)
    }
    // [GET] /admin/products
    showAll(req, res, next) {
        books.find()
        .then(books =>  {
            return res.json({
                "success" : true,
                "books" : books,
            });
        })
    }
    // [GET] /books/search
    search(req, res, next) {
        books.findOne({
            bookName : req.query.tag
        })
        .then(book => {
            res.render('books/show', {
                book : mongooseToObject(book)
            })
        })
        .catch(next)
    }
    // [GET] /books/create
    create(req, res, next){
        res.render('books/create')
    }

     // [POST] /books/create
     store(req, res, next){
         const formData = req.body
         const book = new books(formData);
         book.save()
                .then(() => res.redirect(`/`))
         
    }

    // [GET] /books/:id/create
    edit(req, res, next){
        books.findById(req.params.id)
                .then(book =>  res.render('books/edit',{
                    book : mongooseToObject(book)
                }))
                .catch(next)
            }
        // [PUT] /books/:id
        update(req, res, next){
            books.updateOne({
                _id : req.params.id
            }, req.body)
        .then(() => res.redirect('/me/stored/books'))
        .catch(next)
    }
    // [DELETE] /books/:id
    delete(req, res, next){
        books.deleteOne({
            _id : req.params.id
        })
                .then(() => res.redirect('back') )
                .catch(next)
    }
}
   
module.exports = new BookController();