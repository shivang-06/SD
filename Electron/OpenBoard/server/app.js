//npm install express
const express = require("express");
const app = express();

app.use(express.static("activity"));
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname,"Activity/index.html"));
})
//tcp => uniquely identify server on a machine

app.listen(3000,function(){
    console.log("Server is listening to request at port 3000");
})