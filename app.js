const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

mongoose
    .connect(
        
    )
    .then(result => {
        app.listen(3000, console.log("server started"));
    })
    .catch(err => {
        console.log(err);
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
})

app.use(authRoutes);
app.use(mainRoutes);

module.exports = app;