const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret key");
        next();
    } catch (err) {
        res.status(404).json({
            message: 'Not Authorized'
        })
    }
};