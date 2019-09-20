const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Question = require('../models/question');

exports.addQ = (req, res) => {
    const q = new Question({
        level: 4,
        questionUrl: 'fourth',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
        answer: 'fourth'
    });
    q.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLevel = (req, res) => {
    requestedQuestionLevel = req.params.questionLevel;
    console.log(requestedQuestionLevel);
    Question.findOne({
            level: requestedQuestionLevel
        })
        .then(result => {
            if (result == null) {
                res.status(404).json({
                    message: 'Not Authorized'
                });
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

//Only called when answer is correct
//Answer verified in the frontend as answer is send along the question object
exports.postLevel = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    currentUser = jwt.decode(token, 'secret key').userName;
    User.updateOne({
        userName: currentUser
    }, {
        level: req.body.level + 1,
        timestamp: Date.now()
    }, (err, User) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: 'Data Not Updated',
                user: User
            })
        } else {
            console.log(User);
            res.status(200).json({
                message: 'User Updated',
                user: User
            });
        }
    });
};

exports.getUsers = (req, res) => {
    User.find({}).sort({
            level: -1,
            timestamp: 1
        })
        .then(users => {
            if (!users) {
                res.status(404).json({
                    message: 'Cant fetch data'
                });
            } else {
                res.status(200).json(users);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: 'error'
            });
        });
};