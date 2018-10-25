const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
const category = require('../controller/category')
const news = require('../controller/news')
const swiper = require('../controller/swiper')
const topic = require('../controller/topic')
const comment = require('../controller/comment')
/* GET home page. */
router.use('/admin/adminUser', adminUser);
router.use('/admin/category', category)
router.use('/admin/news', news)
router.use('/admin/swiper', swiper)
router.use('/admin/topic', topic)
router.use('/admin/comment', comment)
module.exports = router;
