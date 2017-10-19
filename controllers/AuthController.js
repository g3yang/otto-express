var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var User = require('../models/User');
var config = require('../config');
var users = [];

router.post('/token', (req,res)=>{
    let {email, password} = req.body;
    if(!(email && password)){
        return res.sendStatus(400);
    }

    User.authenticate(email, password, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error_message: 'Failed Authentication'
            });
        }

        let payload = {
            id: user.id
        };

        let token = jwt.encode(payload, config.jwtSecret);
        res.json({token});
    });

});

module.exports = router;
