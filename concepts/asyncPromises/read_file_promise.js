let fs = require("fs");

let files = ["f1.txt","f2.txt","f3.txt"]
let read = fs.promises.readFile(files[0])
