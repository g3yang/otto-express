var express = require('express');
var router = express.Router();
var passport = require('../middlewares/passport');
var Todo = require('../models/Todo');

router.get('/todos', passport.authenticate(), (req,res)=>{

});


router.post('/todos', passport.authenticate(), (req,res)=>{
    let description = req.body.description;
    let user = req.user;
    let newTodo = {
        description: description,
        user: user._id
    };

    Todo.create(newTodo, (err, todo)=>{
        if(err){
            return res.status(400).send(err);
        }

        user.todos.push(todo._id);
        user.save((err)=>{
            if(err){
                return res.status(400).send(err);
            }
            return res.json(todo);    
        });
    });
});

module.exports = router;
