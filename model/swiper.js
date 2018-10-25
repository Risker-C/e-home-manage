const mongoose = require('mongoose')
const Schema = mongoose.Schema

const swipeSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'news'
    },
    type: {
        type: Number,
        default: 1
    },
    index: {
        type: Number,
        default: 1
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const swipeModel = mongoose.model('swiper', swipeSchema)
module.exports = swipeModel
