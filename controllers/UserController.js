var express = require('express');
var router = express.Router();
var passport = require('../middlewares/Passport');
var User = require('../models/User');
var _ = require('lodash');

router.get('/user', passport.login(), (req,res)=>{
    res.json(req.user);
});

router.post('/users', (req, res)=>{
    let {email, password} = req.body;

    let userData = {
        email,
        password
    };
    User.create(userData, (error, user)=>{
        if(error){
            return res.status(400).send(error.message);
        }
        return res.json({
            id: user.id
        });
    });
});




module.exports = router;