const {Router} = require('express')
const router = Router()
const newsModel = require('../model/news')
const auth = require('./auth')
const categoryModel = require('../model/category')
//添加新闻
router.post('/addNews', auth, async (req, res, next) => {
    try {
        const {
            title,
            header,
            content,
            contentText,
            author,
            category
        } = req.body
        const isCatagory = await categoryModel.findOne({_id: category})
        if (isCatagory) {
            const data = await newsModel.create({
                title,
                header,
                content,
                contentText,
                author,
                category
            })
            let countNum = await categoryModel.findOne({_id: category}).countNum + 1
            await categoryModel.updateOne({_id: category},{$push: {news: data._id}, $set: {countNum}})
            res.json({
                code: 200,
                msg: '新闻添加成功',
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '分类不存在'
            })
        }
    } catch (err) {
      next(err)
    }
})

// 修改新闻
router.put('/editNews', auth, async(req, res, next) => {
    try {
        const {
            _id,
            title,
            header,
            content,
            contentText,
            author,
            category,
            old_category
        } = req.body
        // 判断数据是否存在空值
        if (_id === '' ||
            title === '' ||
            header === '' ||
            content === '' ||
            contentText === '' ||
            author === '' ||
            old_category === '' ||
            category === '') {
            res.json({
                code: 400,
                msg: '信息不完整'
            })
        }
        // 查询是否存在此分类
        const isCatagory = await categoryModel.findOne({_id: category})
        if (isCatagory) {
            // 原分类表分类数减一
            let countNum1 = await categoryModel.findOne({_id: category}).countNum
            // 判断原分类表内是否有新闻
            // 目的是去除，新闻添加时未入表，引发的删除表内新闻数量变为负值的情况
            countNum1 = countNum1 > 0 ? countNum1 - 1 : 0
            // 删除原分类表中的数据
            await categoryModel.updateOne({_id: old_category}, {$pull: {news: _id}, $set: {countNum: countNum1}})
            const data = await newsModel.updateOne({_id},{$set: {
                    title,
                    header,
                    content,
                    contentText,
                    author,
                    category
                }})
            let countNum2 = await categoryModel.findOne({_id: category})
            console.log(countNum2.countNum+1)
            // 在新分类表中添加此新闻
            await categoryModel.updateOne({_id: category}, {$push: {news: _id}, $set: {countNum: countNum2.countNum+1}})
            res.json({
                code: 200,
                msg: '新闻修改成功',
                data
            })
        } else {
            res.json({
                code: 400,
                msg: '分类不存在'
            })
        }
    } catch (err) {
      next(err)
    }
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
        const count = await newsModel.count()
        res.json({
            code: 200,
            data,
            count,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
})

// 获取单条新闻
router.get('/newsList/id=:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const data = await newsModel.findOne({_id: id})
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