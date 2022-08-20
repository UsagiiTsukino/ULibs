const booksRouter = require('./books');
const usersRouter = require('./users');
// const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const loginRouter = require('./login');
const siteController = require('../app/controllers/SiteController');
const LoginController = require('../app/controllers/LoginController.js');
const registerRouter = require('./register');
const passport = require('passport');
const { urlencoded } = require('body-parser');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const users = require('../app/models/User');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
function route(app) {

  app.get('/auth/facebook',
  passport.authenticate('facebook',{
    scope: ['email']
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      const profile = req.user
      users.findOneAndUpdate(
        {
          ID: profile.id,
          displayName: profile.displayName
        },
        {$set: {
          username : profile.id,
          displayName : profile.displayName,
          email : profile.emails[0].value,
          avatar_img : profile.photos[0].value
        }},
        {
          new: true
        }
        ,
        (err, user) => {
          if(!user){
            const userData = new users(user);
                  userData.ID = profile.id;
                  userData.username = profile.id,
                  userData.displayName = profile.displayName,
                  userData.email = profile.emails[0].value,
                  userData.avatar_img = profile.photos[0].value
                  userData.save()
                          .then(() => {
                              return
                          });
                  var token =  jwt.sign({
                    _id : profile._id,
                  }, 'mk')
                  res.cookie('token',token, { maxAge: 9600000});
                  res.redirect('/');
                
          }
          else {
              var token =  jwt.sign({
                _id : profile._id,
              }, 'mk')
              res.cookie('token',token, { maxAge: 9600000});
              res.redirect('/');
          }
          console.log(user);
      })
    });

    app.use('/books', LoginController.checkAuth, booksRouter)
    app.use('/users', LoginController.checkAuth, usersRouter)
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/', LoginController.checkAuth, siteRouter);
    app.use('/me', LoginController.checkAuth, meRouter);


    app.get('/api/users', (req, res, next) => {
      if(req.user) res.json(
        {
          "displayName": req.user.displayName,
          "avatar_img" : req.user.photos[0].value,
          "email" : req.user.emails[0].value
        }
      );
      else {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'mk')
        users.findOne({_id: result._id})
             .then (data => res.json({
                "displayName": data.displayName,
                "avatar_img" : data.avatar_img,
                "email" : data.email
             }))
             .catch (err => res.json(err))
      }
    });
    
    app.get('/api/users/all', (req, res, next) => {
      if(req.user) res.json(req.user);
      else {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'mk')
        users.updateMany({
          phoneNumber : null,
        }, {
          phoneNumber : "Bạn chưa liên kết số điện thoại"
        })
             .then (data => res.json(data))
             .catch (err => res.json(err))
      }
    });
    app.use('/vietnam_books',siteController.showVietNamBooks);
    app.use('/english_books',siteController.showEnglishBooks);
    app.use('/abilities_books',siteController.showAbilitiesBooks)
    app.use('/detective_books',siteController.showDetectiveBooks);
    app.use('/comic_books',siteController.showComicBooks);

    app.get('*', function(req, res){
        res.status(404).render('404');  
      });
}

module.exports = route;
