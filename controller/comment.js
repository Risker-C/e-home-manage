const {Router} = require('express')
const router = Router()
const auth = require('./auth')
const comment = require('../model/comment')
const Topic = require('../model/topic')

// 添加一条评论
router.post('/add', auth, async (req, res, next) => {
    try {
        const {content, user, topic} = req.body
        // 评论表添加一条评论
        const data = await comment.create({content, user, topic})

        // 话题表内评论数+1
        // 话题表内评论数组加一条数据
        let count = await Topic.findOne({_id: topic})
        await Topic.updateOne({_id: topic}, {$push: {comments: data._id}, $set: {countNum: count.countNum + 1}})

        res.json({
            code: 200,
            msg: '评论成功',
            data
        })
    } catch (err) {
      next(err)
    }
})

// 查询一条评论
router.get('/id=:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const data = await comment
            .findOne({_id: id})
            .populate({
                path: 'user',
                select: '_id username nickname'
            })
            .populate({
                path: 'topic',
                select: '_id content'
            })
        console.log(data)
        res.json({
            code: 200,
            data,
            msg: '获取成功'
        })
    } catch (err) {
      next(err)
    }
})

module.exports = router