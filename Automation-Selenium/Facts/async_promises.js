let fs = require("fs")
console.log("before");
console.log("start");
let file = fs.promises.readFile("f1.html")
console.log(file); // this will print <pending promise> until it is eithe fulfilled or rejected.

console.log("after");

file.then(function(content){ // if promise is fulfilled => this function is invoked
    console.log(content+"");
    console.log("finished");
    
})
file.catch(function(err){ // if promise is rejectd  => this function is invoked
    console.log(err);
    
})