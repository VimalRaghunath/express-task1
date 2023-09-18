const express = require("express");
const App = express();
const port = 3000;
const database = require('./userinfo');
const bodyParser = require("body-parser");
App.use(bodyParser.json());

App.get("/",(req,res)=>{
  res.send(database);
})
App.post("/users",(req,res)=>{
    const { username,name,email } = req.body;
    value = { id:Date.now(), username: username, name: name, email: email };
    database.push(value);
    res.json("added successfully");
});

App.put("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    console.log(id);
    const userindex = database.findIndex((user)=> user.id ===id);
    console.log(userindex);
    if(userindex===-1){
        res.status(404).json({Error:"user not found"})
    } else {
        const { username,name,email }= req.body
        database[userindex]={...database[userindex],name,email,username}
        res.json(database[userindex])
    }
});

App.delete("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const userindex = database.findIndex((user)=>user.id===id)
    if(userindex===-1){
        res.status(404).json({Error:"user not found"})
    } else {
        database.splice(userindex,1)
        res.json(database)
    }
})

App.listen(port);