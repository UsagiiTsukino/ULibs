const express = require('express');
const router = express.Router();

const BookController = require('../app/controllers/BookController.js');

router.get('/create', BookController.create);
router.post('/store', BookController.store);
router.get('/:id/edit', BookController.edit)
router.put('/:id', BookController.update)
router.delete('/:id', BookController.delete)
router.get('/:slug', BookController.search)
router.get('/:slug/show', BookController.show);


module.exports = router;
