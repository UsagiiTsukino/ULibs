const books = require("../models/Book");
const { mongooseToObject } = require('../../util/mongoose');
const { param } = require("express/lib/request");


class CourseController {
  
    // [GET] /search
    show(req, res, next) {
        books.findOne({
            slug : req.params.slug
        })
        .then(course => {
            res.render('books/show', {
                course : mongooseToObject(course)
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
         const course = new books(formData);
         course.save()
                .then(() => res.redirect(`/`))
         
    }

    // [GET] /books/:id/create
    edit(req, res, next){
        books.findById(req.params.id)
                .then(course =>  res.render('books/edit',{
                    course : mongooseToObject(course)
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
   
module.exports = new CourseController();