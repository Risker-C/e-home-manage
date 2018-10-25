const {Router} = require('express')
const router = Router()
const auth = require('./auth')
const topic = require('../model/topic')


// 添加一个话题
router.post('/add', async (req, res, next) => {
    try {
        const {content, user} = req.body
        const data = await topic.create({content, user})
        res.json({
            code: 200,
            msg: '发送成功',
            data
        })
    } catch (err) {
      next(err)
    }
})

// 获取话题列表
router.get('/', async (req, res, next) => {
    try {
        const {page, rows} = req.body
        const data = await topic
            .find()
            .skip((page - 1) * rows)
            .limit(rows)
            .populate({
                path: 'comments',
                options:{
                    sort:{'_id': -1},
                    select: '_id content'
                },
            })
            .populate({
                path: 'user',
                select: '_id nickname username'
            })
            .sort({_id: -1})
        const count = await topic.count()
        res.json({
            code: 200,
            msg: '获取成功',
            data,
            count
        })
    } catch (err) {
      next(err)
    }
})

// 获取一个话题
router.get('/id=:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const data = await topic
            .findOne({_id: id})
            .populate(
                {
                    path: 'comments',
                    options:{
                        sort:{'_id': -1}
                    }
                })
        res.json({
            code: 200,
            msg: '获取成功',
            data
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router