const mongoose = require('mongoose')

const topic = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'adminUser',
        required: true
    },
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'comment'
        }
    ]
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('topic', topic)