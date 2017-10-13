var passport = require('passport');
var passportJWT = require('passport-jwt');
var User = require('../models/User');
var cfg = require('../config');
var ExtractJwt = passportJWT.ExtractJwt;  
var JwtStrategy = passportJWT.Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var _ = require('lodash');

var users =[
    {   email:'john@mail.com',
        password: 'john123'
    }
];

var params ={
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var loginStrategy = new JwtStrategy(params, (payload,done)=>{
    let userId = new mongoose.Types.ObjectId(payload.id);
    User.findOne({_id: userId}).exec(function(err, user){
        if(err){
            return done(new Error('Error in finding user'));
        }
        if(!user){
            return done(new Error('Can not find this user'));
        }else{
            return done(null, user);
        }
    });
});

passport.use('login',loginStrategy);

module.exports = {
    initialize:function(){
        return passport.initialize();
    },
    authenticate: function(){
        return passport.authenticate('login', cfg.jwtSession)
    }
}