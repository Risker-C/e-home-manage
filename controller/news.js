const {Router} = require('express')
const router = Router()
const newsModel = require('../model/news')
const auth = require('./auth')
//添加新闻
router.post('/addNews', auth, (req, res, next) => {
    const {
        title,
        header,
        content,
        contentText,
        author,
        category
    } = req.body
    newsModel.create({
        title,
        header,
        content,
        contentText,
        author,
        category
    }).then(data => {
        res.json({
            code: 200,
            msg: '新闻添加成功',
            data
        })
    }).catch(err => {
        next(err)
    })
})

// 获取新闻
router.get('/newsList', async (req, res, next) => {
    try {
        let {page=1, rows=10} = req.body
        page = parseInt(page)
        rows = parseInt(rows)
        const data = await newsModel
            .find()
            .skip((page - 1) * rows)
            .limit(rows)
            .populate({
                path: 'author',
                select: '-username -password'
            })
            .populate({
                path: 'category'
            })
        res.json({
            code: 200,
            data,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
})



module.exports = router