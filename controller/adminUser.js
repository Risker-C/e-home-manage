const {Router} = require("express")
const router = Router();
const adminUser = require("../model/adminUser")
const auth = require("./auth")
// 创建用户
router.post("/add", auth, (req, res, next) => {
    let {
        username,
        header,
        password,
        idCard,
        desc,
        nickname,
        sex,
        phone
    } = req.body
    console.log(req.body)
    adminUser.create({
        username,
        header,
        password,
        idCard,
        desc,
        nickname,
        phone,
        sex
    }).then(data => {
        res.json({
            code: 200,
            msg: '添加成功'
        })
    }).catch(err => {
        next(err)
    })
})

// 用户登录
router.post("/login", (req, res, next) => {
    let {username, passwword} = req.body
    adminUser.findOne({username}).then(data => {
        if (data === null) {
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        } else if (data.username === username) {
            req.session.user = data
            data.password = ''
            res.json({
                code: 200,
                msg: '登录成功',
                data: data
            })
        } else {
            res.json({
                code: 401,
                msg: '密码错误'
            })
        }
    }).catch(err => {
        next(err)
    })
})

// 管理员列表
router.get("/",  (req, res, next) => {
    let {page= 1, rows= 10} = req.query
    page = parseInt(page)
    rows = parseInt(rows)
    console.log(req.query)
    adminUser
        .find()
        .skip(( page - 1 ) * rows)
        .limit(rows)
        .sort({ '_id': -1 })
        .then(data => {
        res.json({
            code: 200,
            data,
            msg: '获取管理员列表成功'
        })
    }).catch(err => {
        next(err)
    })
})

// 修改密码
router.put('/',auth , (req, res, next) => {
    const {password, new_password} = req.body
    const username = req.session.user.username
    adminUser.findOne({username}).then(data => {
        if(data.password === password) {
            adminUser.update({
                username
            },{
                password:new_password
            }).then(data => {
                res.json({
                    code: 200,
                    msg: '密码更改成功，请重新登录'
                })
            }).catch(err => {
                next(err)
            })
        } else {
            res.json({
                code: 401,
                msg: '密码错误'
            })
        }
    }).catch(err => {
        next(err)
    })

})

// 退出登录
router.get('/logout', (req, res, next) => {
    if(req.session && req.session.user) {
        req.session.user = ''
        res.json({
            code: 200,
            msg: '退出成功'
        })
    } else {
        res.json({
            code: 400,
            msg: '当前尚未登录'
        })
    }
})

module.exports = router