const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs =  require("fs");
const path = require("path");
//REST API
//HTTP request =>
app.use(express.json());//if you want data in req section,=> you must write this line to receive data from client
//create => POST
app.post("/api/users",function(req,res){
    let user = req.body;
    //save in DB.
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,"user.json"), JSON.stringify(userDB));
    //if a new entry is created on server
    res.status(201).json({
        success:"successful",
        user :user
    })
})


//read =>  GET

app.get("/api/users",function(req,res){
    console.log("Received req");
    res.status(200).json({
        status: "success received get request from client",
    })
})
//updated => PATCH
//delete => DELETE


//localhost:3000/api/users
app.listen(3000,function(){
    console.log("server is listening at port 3000");
})