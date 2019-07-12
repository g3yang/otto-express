var express = require('express');
var router = express.Router();
var passport = require('../middlewares/passport');
var Todo = require('../models/Todo');

router.get('/todos', passport.authenticate(), (req,res)=>{
    let user = req.user;
    Todo.find({user: user._id}).exec((err, todos)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.json(todos);
    });
});


router.delete('/todos/:id', passport.authenticate(), (req, res)=>{
    let id = req.params.id;
    Todo.findById(id, (err, todo)=>{
        if(err){
            return res.status(400).send(err);
        }
        if(!todo){
            return res.status(400).send(new Error('Invalid todo ID'));
        }
        todo.remove((err)=>{
            if(err){
                return res.status(400).send(err);
            }
            return res.send();
        })
    });
});


router.get('/todos/:id', passport.authenticate(), (req, res)=>{
    let id = req.params.id;
    Todo.findOne({user:req.user.id, _id:id}).exec((err, todo)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.json(todo);
    })
});




router.post('/todos', passport.authenticate(), (req,res)=>{
    const {description, title} = req.body
    let user = req.user;
    let newTodo = {
        description: description,
        title: title,
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

router.put('/todos/:id',passport.authenticate(),(req, res)=>{
    const {description, title} = req.body;
    const id = req.params.id;
    Todo.findByIdAndUpdate(id,{
        title, 
        description
    }, {new:true},
    (err, todo)=>{
        if(err){
            return res.status(400).send(err);
        }

        return res.json(todo);
    });
});

module.exports = router;
