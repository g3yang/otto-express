var passport = require('passport');
var passportJWT = require('passport-jwt');
var users = require('./users');
var cfg = require('./config');
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;
var _ = require('lodash');

var params ={
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var strategy = new Strategy(params, (payload,done)=>{
    let user = _.find(users,{id:payload.id});
    if(user){
        return done(null, user);
    } else {
        return done(new Error('User not found'),null);
    }
});

passport.use(strategy);


module.exports = function() {
    return {
        initialize:function(){
            return passport.initialize();
        },
        authenticate: function(){
            return passport.authenticate('jwt', cfg.jwtSession)
        }
    }
}