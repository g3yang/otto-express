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

var signupStrategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
}, function(email, password, done){
    let user = _.find(users, {email:email});
    if(user){
        return done(null, false, {
            error_message: 'This email has been used.'
        });
    }
    let newUser = {
        email,
        password
    };
    users.push(newUser);
    return done(null, newUser);
});




passport.use('login',loginStrategy);
passport.use('signup',signupStrategy);

module.exports = function() {
    return {
        initialize:function(){
            return passport.initialize();
        },
        login: function(){
            return passport.authenticate('login', cfg.jwtSession)
        },
        signup: function(){
            return passport.authenticate('signup', cfg.jwtSession);
        }
    }
}