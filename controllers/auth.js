const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res) => {
    let fetchedUser;
    User.findOne({
            userName: req.body.userName
        })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'Invalid Credentials'
                });
            } else {
                fetchedUser = user;
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (!result) {
                            res.status(404).json({
                                message: 'Invalid Credentials'
                            });
                        } else {
                            const token = jwt.sign({
                                userName: fetchedUser.userName,
                            }, 'secret key');
                            res.status(200).json({
                                token: token,
                                user: fetchedUser
                            });
                        }
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: 'Invalid Credentials'
            });
        });
};

exports.postSignUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                userName: req.body.userName,
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash,
                level: 1,
                timestamp: req.body.timestamp
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Registered',
                        result: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).json({
                        message: 'User Not Registered'
                    });
                });
        });
};

exports.getUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    currentUser = jwt.decode(token, 'secret key').userName;
    User.findOne({
            userName: currentUser
        })
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'User Not fetched'
                });
            } else {
                res.status(200).json({
                    message: 'User fetched',
                    user: result
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: 'User Not fetched'
            });
        });
};