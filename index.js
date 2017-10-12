var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var authController = require('./controllers/AuthController');
var userController = require('./controllers/UserController');
var passport = require('./middlewares/Passport');
var mongoose = require('mongoose');

mongoose.connect(config.db.url);

app.use(bodyParser());
app.use(passport.initialize());
app.use(authController);
app.use(userController);
app.get('/', (req,res)=>{
    res.json({
        status:'My API is alive'
    });
});

app.listen(3000, ()=>{
    console.log('My API server is running.');
});
