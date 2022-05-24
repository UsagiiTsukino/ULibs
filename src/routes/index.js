const booksRouter = require('./books');
const usersRouter = require('./users');
// const newsRouter = require('./news');
const siteRouter = require('./site');
// const meRouter = require('./me');

function route(app) {

    app.use('/books', booksRouter)
    // app.use('/me', meRouter);
    // app.use('/news', newsRouter);
    app.use('/users', usersRouter)
    app.use('/', siteRouter);

}

module.exports = route;
