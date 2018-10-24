const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String
    },
    countNum: {
        type: Number,
        default: 0
    },
    news: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'newsModel'
        }
    ]
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('category', categorySchema)
