const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('category', categorySchema)
