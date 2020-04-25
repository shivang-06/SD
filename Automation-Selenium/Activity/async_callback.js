let fs = require("fs")
console.log("before");
console.log("Start");

 fs.readFile("f1.html",function(err,content){ //this is a call back function
    if(err){
        console.log(err);
        return
    }
    console.log(content+"");
    console.log("finish")
});

console.log("after");
