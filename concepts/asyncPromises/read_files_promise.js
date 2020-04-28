let fs = require("fs");

let file =  fs.promises.readFile("f1.txt")
.then(function(data){
    console.log("FILE: "+data);
    let file2 = fs.promises.readFile("f2.txt")
    return file2
}).then(function(data){
    console.log("FILE2: "+data);
    let file3 = fs.promises.readFile("f3.txt")
    return file3
}).then(function(data){
    console.log("FILE3 : "+data);
    
})