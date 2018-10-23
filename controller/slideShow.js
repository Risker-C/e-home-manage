const {Router} = require('express')
const router = Router()
const slideShowModel = require('../model/slideShow')
const auth = require('./auth')

// 添加轮播图
router.post('/addSlideShow', auth, async (req, res, next) => {
    try {
       const {header, news} = req.body
        const data = await slideShowModel.create({
            header,
            news
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
router.get('/slideShowList', async (req, res, next) => {
    try {
       let {page=1, rows=10} = req.query
        page = parseInt(page)
        rows = parseInt(rows)
        const data = await slideShowModel
            .find()
            .skip((page - 1) * rows)
            .limit(rows)
        res.json({
            code: 200,
            data,
            msg: 'succes'
        })
    } catch (err) {
      next(err)
    }
})

module.exports = router

