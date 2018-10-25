const {Router} = require('express')
const router = Router()
const swiper = require('../model/swiper')
const newsModel = require('../model/news')
const auth = require('./auth')

// 添加轮播图
router.post('/add', auth, async (req, res, next) => {
    try {
       const {header, news, index, category, type} = req.body
        const data = await swiper.create({
            header,
            news,
            index,
            type,
            category
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
router.get('/swiperList', async (req, res, next) => {
    try {
       let {page=1, rows=10} = req.query
        page = parseInt(page)
        rows = parseInt(rows)
        const data = await swiper
            .find()
            .skip((page - 1) * rows)
            .limit(rows)
            .populate({
                path: 'news'
            })
            .populate({
                path: 'category'
            })
            .sort({
                index: '-1'
            })
        const count = await swiper.count()
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

// 查询单张轮播图
router.get('/id=:id', async (req, res, next) => {
    try {
       let {id} = req.params
        console.log(id)
        const data = await swiper
            .findOne({_id: id})
            .populate({
                path: 'news',
                select: 'title _id'
            })
            .populate({
                path: 'category',
                select: '_id title'
            })
        res.json({
            code: 200,
            data,
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
        const swipe = await swiper.findOne({_id})
        if (swipe) {
            const newsdata = await newsModel.findOne({_id: news})
            if(newsdata) {
                const data = await swiper
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

