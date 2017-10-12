var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var users = require('../models/Users');
var config = require('../config');

router.post('/token', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!(email && password)){
        return res.sendStatus(401);
    }

    let user = users.find(u=>u.email == email 
            && u.password == password);
    if (user){
        let payload = {
            id: user.id
        };
        let token = jwt.encode(payload, config.jwtSecret);
        res.json({token});
    } else { 
        res.sendStatus(401);
    }
});

router.post('/signup', (req, res)=>{
    console.log(req);
});


module.exports = router;
