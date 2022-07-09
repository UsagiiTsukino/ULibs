// const users = require("../models/user");
// const { mongooseToObject } = require('../../util/mongoose');
// const { param } = require("express/lib/request");


// class UserController {
  
//     // [GET] /search
//     show(req, res, next) {
//         users.findOne({
//             username : req.params.username
//         })
//         .then(user => {
//             res.render('users/show', {
//                 user : mongooseToObject(user)
//             })
//         })
//         .catch(next)
//     }
//     // [GET] /users/create
//     register(req, res, next){
//         res.render('users/register')
//     }


//     // [GET] /users/:id/create
//     changePassword(req, res, next){
//         users.findById(req.params.id)
//                 .then(user =>  res.render('users/changePassword',{
//                     user : mongooseToObject(user)
//                 }))
//                 .catch(next)
//             }
//     //     // [PUT] /users/:id
//     //     update(req, res, next){
//     //         users.updateOne({
//     //             _id : req.params.id
//     //         }, req.body)
//     //     .then(() => res.redirect('/me/stored/users'))
//     //     .catch(next)
//     // }
//     // // [DELETE] /users/:id
//     // delete(req, res, next){
//     //     users.deleteOne({
//     //         _id : req.params.id
//     //     })
//     //             .then(() => res.redirect('back') )
//     //             .catch(next)
//     // }
// }
   
// module.exports = new UserController();