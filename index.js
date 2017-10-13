var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var authController = require('./controllers/AuthController');
var userController = require('./controllers/UserController');
var todosController = require('./controllers/TodosController');
var passport = require('./middlewares/Passport');
var mongoose = require('mongoose');

mongoose.connect(config.db.url);

app.use(bodyParser());
app.use(passport.initialize());
app.use(authController);
app.use(userController);
app.use(todosController);
app.get('/', (req,res)=>{
    setTimeout(()=>{
        res.json({
            status:'My API is alive'
        });
    },10000);
});

app.listen(3000, ()=>{
    console.log('My API server is running.');
});
