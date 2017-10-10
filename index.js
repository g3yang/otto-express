var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./auth')();
var app = express();
var config = require('./config');
var jwt = require('jwt-simple');
app.use(auth.initialize());


app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.json({
        status:'My API is alive'
    });
});

app.post('/token', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!(email && password)){
        return res.sendStatus(401);
    }

    let user = users.find(u=>u.email == email 
            && u.password == password);
    if (user){
        let payload = {
            id: user.id
        };
        let token = jwt.encode(payload, config.jwtSecret);
        res.json({token});
    } else { 
        res.sendStatus(401);
    }
});


app.listen(3000, ()=>{
    console.log('My API server is running.');
});
