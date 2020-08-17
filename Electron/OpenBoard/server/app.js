//npm install express
const express = require("express");
const app = express();
//server
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);

app.use(express.static("Activity"));
socketServer.on("connection",function(socket){
    console.log("New client connected");
    console.log(socket.id);
})
//tcp => uniquely identify server on a machine

app.listen(3000,function(){
    console.log("Server is listening to request at port 3000");
})