const {Router} = require('express')
const router = Router()
const categoryModel = require('../model/category')
const auth = require('./auth')

// 添加分类
router.post('/add', auth, (req, res, next) => {
    const {title, icon} = req.body
    categoryModel.create({title, icon}).then(data => {
        res.json({
            code: 200,
            msg: '分类添加成功',
            data
        })
    }).catch(err => {
        next(err)
    })
})

// 修改分类
router.put('/update', auth, (req, res, next) => {
    const {_id, title, icon} = req.body
    categoryModel.findOne({_id},{title: title,icon: icon}).then(data => {
        res.json({
            code: 200,
            msg: '分类修改成功',
            data
        })
    }).catch(err => {
        next(err)
    })
})

// 获取分类
router.get('/', async (req, res, next) => {
    try {
        let {page = 1, rows = 10} = req.body
        page = parseInt(page)
        rows = parseInt(rows)
        const data = await categoryModel.find().skip((page - 1) * rows).limit(rows)
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