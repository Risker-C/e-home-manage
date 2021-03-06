const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    contentText: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'adminUser',
        isRequired: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        isRequired: true
    }
},{versionKey: false,timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

const newsModel = mongoose.model('news', newsSchema)
module.exports = newsModel