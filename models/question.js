const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    level: {
        type: Number
    },
    questionUrl: {
        type: String
    },
    imageUrl: {
        type: String
    },
    answer: {
        type: String
    }
});

module.exports = mongoose.model('Question', questionSchema);