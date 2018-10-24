const {Router} = require('express')
const router = Router()
const auth = require('./auth')
const comment = require('../model/comment')
const Topic = require('../model/topic')
router.post('/add', auth, async (req, res, next) => {
    try {
        const {content, user, topic} = req.body
        const data = await comment.create({content, user, topic})
        await Topic.updateOne({_id: topic}, {$push: {comments: data._id}})
        // topicData.comments.push(data._id)
        // console.log(topicData)
        // await Topic.updateOne({_id: topic},{$set: ...topicData})
        res.json({
            code: 200,
            msg: '评论成功',
            data
        })
    } catch (err) {
      next(err)
    }
})



module.exports = router