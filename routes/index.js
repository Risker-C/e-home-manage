const express = require('express');
const router = express.Router();
const adminUser = require('../controller/adminUser')
const category = require('../controller/category')
const news = require('../controller/news')
const swiper = require('../controller/swiper')
const topic = require('../controller/topic')
const comment = require('../controller/comment')
const user = require('../model/user')
const jwt = require('jsonwebtoken')
const cert = require('../util/cert')
/* GET Admin */
router.use('/admin/adminUser', adminUser);
router.use('/admin/category', category)
router.use('/admin/news', news)
router.use('/admin/swiper', swiper)
router.use('/admin/topic', topic)
router.use('/admin/comment', comment)

/* Get User */
// 创建用户
router.post("/addUser", (req, res, next) => {
    let {
        username,
        header,
        password,
        idCard,
        desc,
        nickname,
        sex,
        phone,
        email,
        age,
        hometown,     // 家庭住址
        address,      // 工作地址
        nation,       // 民族
        wxNum,        // 微信号
        qqNum,        // QQ号
        education,    // 性别
        jobRank,      // 最高学历
        salary,       // 职称
        joinPartyTime,  // 薪资水平
        lastPayTime,    // 入党时间
        partyIdentity // 当前身份
    } = req.body
    console.log(req.body)
    user.create({
        username,
        header,
        password,
        idCard,
        desc,
        nickname,
        phone,
        sex,
        email,
        age,
        hometown,
        address,
        nation,
        wxNum,
        qqNum,
        education,
        jobRank,
        salary,
        joinPartyTime,
        lastPayTime,
        partyIdentity
    }).then(data => {
        res.json({
            code: 200,
            msg: '添加成功',
            data
        })
    }).catch(err => {
        next(err)
    })
})

router.post('/login', (req, res, next) => {
    const {username, password} = req.body
    if (username && password) {
        user.findOne({username}).then(data => {
            if (data) {
                if (data.password === password) {
                    const token = jwt.sign({userId: data._id}, '1024', {expiresIn: 60*60})
                    res.json({
                        code: 200,
                        token,
                        data
                    })
                } else {
                    res.json({
                        code: 403,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    code: 403,
                    msg: '用户不存在'
                })
            }
        })
    } else {
        res.json({
            code: 403,
            msg: '缺少必要参数'
        })
    }
})

router.get('/get', (req, res, next) => {
    try {
        const token = req.headers.token || req.body.token || req.query.token
        if (token)  {
            jwt.verify(token, '1024', function (err, decoded) {

                if (err) {
                    res.json({
                        code: 403,
                        msg: '登录状态失效'
                    })
                }

                user.findOne({_id: decoded.userId}).then(data => {
                    res.json({
                        code: 200,
                        data
                    })
                })
            })
        } else {
            res.json({
                code: 403,
                msg: '登录信息失效'
            })
        }

    } catch (err) {
      next(err)
    }
})

module.exports = router;
