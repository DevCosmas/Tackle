const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = new Schema({

    name: {
        type: String,
        required: [true, 'A task must have a name'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'deleted'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

taskSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'fullname -_id'
    })
    next()
})

const taskModel = mongoose.model('Task', taskSchema)
module.exports = { taskModel }