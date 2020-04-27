function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10); // if we use reject here, it will throw an error
        },1000)
    })
}

let pendingPromise = promiseCreator()
console.log(pendingPromise); // At this stage promise will always be pending

setTimeout(function(){
    console.log(pendingPromise); // at this stage we will acquire the value of promise
},1000) //we are printing after 2sec when resolve is called only after 1 sec this gap will let us acquire value of promise