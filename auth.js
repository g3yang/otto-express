var passport = require('passport');
var passportJWT = require('passport-jwt');
var users = require('./users');
var cfg = require('./config');
var ExtractJwt = passportJWT.ExtractJwt;  
var JwtStrategy = passportJWT.Strategy;
var LocalStrategy = require('passport-local').Strategy;

var _ = require('lodash');

var params ={
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var loginStrategy = new JwtStrategy(params, (payload,done)=>{
    let user = _.find(users,{id:payload.id});
    if(user){
        return done(null, user);
    } else {
        return done(new Error('User not found'),null);
    }
});



passport.use('login',loginStrategy);


module.exports = function() {
    return {
        initialize:function(){
            return passport.initialize();
        },
        authenticate: function(){
            return passport.authenticate('login', cfg.jwtSession)
        }
    }
}