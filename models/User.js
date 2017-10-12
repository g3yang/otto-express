var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

UserSchema.statics.authenticate = function(email, password, callback){
    User.findOne({email:email}).exec((err,user)=>{
        if(err){
            return callback(err);
        } else if(!user){
            var err = new Error('user not found.');
            return callback(err);
        }

        bcrypt.compare(password, user.password,(err, result)=>{
            if(result){
                return callback(null, user);
            } else { 
                return callback();
            }
        })
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if(err){
            return next(err);
        }
        user.password = hash;
        return next();
    })
});
var User = mongoose.model('User', UserSchema);
module.exports = User; 