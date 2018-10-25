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
    countNum: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'comment',
            unique: true
        }
    ]
}, {versionKey: false, timestamp: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('topic', topic)