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

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo; 