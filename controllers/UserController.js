var express = require('express');
var router = express.Router();
var passport = require('../middlewares/Passport');

router.get('/user', passport.login(), (req,res)=>{
    return res.json(req.user);
});

module.exports = router;