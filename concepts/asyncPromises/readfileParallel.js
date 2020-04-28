let fs = require("fs");

let f1 = fs.promises.readFile("f1.txt")
.then(function(data){
    console.log(data);
})

let f2 = fs.promises.readFile("f2.txt")
.then(function(data){
    console.log(data);
})
let f3 = fs.promises.readFile("f3.txt")
.then(function(data){
    console.log(data);
})