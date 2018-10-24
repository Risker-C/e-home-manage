const mongoose = require('mongoose')

const comment = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    topic: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('comment', comment)