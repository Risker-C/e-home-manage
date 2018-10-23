const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideShowSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'news'
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const slideShowModel = mongoose.model('slideShowModel', slideShowSchema)
module.exports = slideShowModel
