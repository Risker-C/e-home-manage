const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    header: { //头像
      type: String,
      default: "http://pbl.yaojunrong.com/icon_default.png" //默认设置一个头像
    },
    password: {
        type: String,
        required: true
    },
    idCard: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String
        // required: true
    },
    sex: Number,
    phone: Number,
    desc: String,
    age: Number,
    email: String,
    hometown: String,     // 家庭住址
    address: String,      // 工作地址
    nation: String,       // 民族
    wxNum: String,        // 微信号
    qqNum: String,        // QQ号
    education: String,    // 性别
    jobRank: String,      // 最高学历
    salary: String,       // 职称
    joinPartyTime: Date,  // 薪资水平
    lastPayTime: Date,    // 入党时间
    partyIdentity: Number // 当前身份
}, {versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}}) // 自动生成添加日期和修改日期

module.exports = mongoose.model('user', userSchema)