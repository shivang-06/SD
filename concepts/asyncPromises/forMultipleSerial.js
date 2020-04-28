let fs = require("fs");

let files = ["f1.txt","f2.txt","f3.txt"]

let read = fs.promises.readFile(files[0])
for(let i=0;i<files.length;i++){
    read = read.then(function(data){
        console.log(data);
        return fs.promises.readFile(files[i])  
    })
}