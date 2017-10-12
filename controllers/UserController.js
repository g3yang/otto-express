var express = require('express');
var router = express.Router();
var passport = require('../middlewares/Passport');
var users = require('../models/Users');
var _ = require('lodash');

router.get('/user', passport.login(), (req,res)=>{
    res.json(req.user);
});

router.post('/users', (req, res)=>{
    let {email, password, id} = req.body;

    let user = _.find(users, {email:email});
    if(user){
        return res.send(400, {
            error_message: 'This email has been used.'
        });
    }
    let newUser = {
        email,
        password,
        id
    };
    users.push(newUser);
    return res.json(newUser);
});




module.exports = router;