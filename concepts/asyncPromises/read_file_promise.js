let fs = require("fs");

let read = fs.promises.readFile("f1.txt")
read.then(function(data){
    console.log("Data read : "+data);
    
})