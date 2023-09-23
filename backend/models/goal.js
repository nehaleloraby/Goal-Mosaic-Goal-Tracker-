const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({

    goal: {
        type: String,
        required: true   
    },
    description: {
        type: String, 
    },
    deadline: {
        type: Date,
        required: true   
    },
    category: {
        type: String,
    },
    progress: {
        type: String,
        enum: ['In Progress', 'Completed'],
        Default: 'In Progress',
    }
})

module.exports = mongoose.model('Goal', goalSchema)

