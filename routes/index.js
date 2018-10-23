const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
const category = require('../controller/category')
const news = require('../controller/news')
const slideShow = require('../controller/slideShow')
/* GET home page. */
router.use('/admin/adminUser', adminUser);
router.use('/category', category)
router.use('/news', news)
router.use('/slideShow', slideShow)
module.exports = router;
