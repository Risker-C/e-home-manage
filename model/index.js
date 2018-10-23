var mongoose = require('mongoose')

var mySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // 需要值
        unique: true // 唯一值
    },
    age: Number,
    desc: String,
    nickname: String,
    password: {
        type: String,
        required: true
    },
    sex: Number,

})

var myModel = mongoose.model('users', mySchema)

module.exports = myModel