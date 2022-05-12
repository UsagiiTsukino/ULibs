const booksRouter = require('./books');
// const newsRouter = require('./news');
const siteRouter = require('./site');
// const meRouter = require('./me');

function route(app) {

    app.use('/books', booksRouter)
    // app.use('/me', meRouter);
    // app.use('/news', newsRouter);
    app.use('/', siteRouter);

}

module.exports = route;
