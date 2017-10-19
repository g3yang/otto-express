var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    description:{
        type:String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

TodoSchema.pre('remove', function(next){
    var User = require('./User');
      
    User.update({
        _id: this.user
    },{
        $pull:{
            todos: this._id
        }
    },(err, val)=>{
        next(err, val)
    });
 
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo; 