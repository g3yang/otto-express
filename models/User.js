var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Todo = require('./Todo');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
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

UserSchema.statics.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.pre('remove', function(next){
    Todo.remove({user: this._id}, (err)=>{
        next(err, null);
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User; 