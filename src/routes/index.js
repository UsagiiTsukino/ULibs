const booksRouter = require('./books');
const usersRouter = require('./users');
// const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const loginRouter = require('./login');
const siteController = require('../app/controllers/SiteController');
const LoginController = require('../app/controllers/LoginController.js');
const registerRouter = require('./register');

const { urlencoded } = require('body-parser');


function route(app) {

    app.use('/books', LoginController.checkAuth, booksRouter)
    app.use('/users', LoginController.checkAuth, usersRouter)
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/', LoginController.checkAuth, siteRouter);
    app.use('/me', LoginController.checkAuth, meRouter);

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
