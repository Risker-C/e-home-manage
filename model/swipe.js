const mongoose = require('mongoose')
const Schema = mongoose.Schema

const swipeSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'newsModel'
    },
    type: {
        type: Number,
        default: 1
    },
    index: {
        type: Number,
        default: 1
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const swipeModel = mongoose.model('swipeModel', swipeSchema)
module.exports = swipeModel
