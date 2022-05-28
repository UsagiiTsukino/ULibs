const booksRouter = require('./books');
const usersRouter = require('./users');
// const newsRouter = require('./news');
const siteRouter = require('./site');
// const meRouter = require('./me');
 const siteController = require('../app/controllers/SiteController');

function route(app) {

    app.use('/books', booksRouter)
    // app.use('/me', meRouter);
    // app.use('/news', newsRouter);
    app.use('/users', usersRouter)
    app.use('/', siteRouter);
   
    app.use('/vietnam_books',siteController.showVietNamBooks);
    app.use('/english_books',siteController.showEnglishBooks);
    app.use('/abilities_books',siteController.showAbilitiesBooks)
    app.use('/detective_books',siteController.showDetectiveBooks);
    app.use('/comic_books',siteController.showComicBooks);

}

module.exports = route;
