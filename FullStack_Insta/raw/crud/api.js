const express = require("express");
const app = express();
//REST API
//HTTP request =>
//create => POST
//read =>  GET
app.get("/api/users",function(req,res){
    console.log("Received req");
    res.status(200).json({
        status: "success received get request from client",
    })
})

app.listen(3000,function(){
    console.log("server is listening at port 3000");
})