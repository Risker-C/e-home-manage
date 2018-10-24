const {Router} = require('express')
const router = Router()
const swipeModel = require('../model/swipe')
const newsModel = require('../model/news')
const auth = require('./auth')

// 添加轮播图
router.post('/add', auth, async (req, res, next) => {
    try {
       const {header, news, index, type} = req.body
        const data = await swipeModel.create({
            header,
            news,
            index,
            type
        })
        res.json({
            code: 200,
            data,
            msg: '轮播图添加成功'
        })
    } catch (err) {
       next(err)
    }
})


// 查询轮播图
router.get('/swipeList', async (req, res, next) => {
    try {
       let {page=1, rows=10} = req.query
        page = parseInt(page)
        rows = parseInt(rows)
        const data = await swipeModel
            .find()
            .skip((page - 1) * rows)
            .limit(rows)
            .populate({
                path: 'news'
            })
        const count = await swipeModel.count()
        res.json({
            code: 200,
            data,
            count,
            msg: 'succes'
        })
    } catch (err) {
      next(err)
    }
})

// 修改轮播图
router.patch('/update',auth ,async (req, res, next) => {
    try {
        const {header, news, type, index, _id} = req.body
        const swipe = await swipeModel.findOne({_id})
        if (swipe) {
            const newsdata = await newsModel.findOne({_id: news})
            if(newsdata) {
                const data = await swipeModel
                    .updateOne({_id},{$set: {header, news, type, index}})
                res.json({
                    code: 200,
                    msg: '修改成功',
                    data
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该新闻不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '该轮播图不存在'
            })
        }
    } catch (err) {
      next(err)
    }

})

module.exports = router

