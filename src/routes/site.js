const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// router.get('/search', siteController.search);
router.get('/vietnam_books',siteController.showVietNamBooks);
router.get('/english_books',siteController.showEnglishBooks);
router.get('/abilities_books',siteController.showAbilitiesBooks)
router.get('/detective_books',siteController.showDetectiveBooks);
router.get('/comic_books',siteController.showComicBooks);
router.get('/', siteController.index);

module.exports = router;