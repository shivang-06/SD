let fs = require("fs")

console.log("Started Executing File");
console.log("cpu is stuck till file is read");

fs.readFile("f1.txt",function(err,data){
    console.log(data.byteLength);
    
})

console.log("cpu is free now");
console.log("now i can print something");

