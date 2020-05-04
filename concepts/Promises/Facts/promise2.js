function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10); // if we use reject here, it will throw an error
        },1000)
    })
}

let pendingPromise = promiseCreator()
console.log(pendingPromise); // At this stage promise will always be pending

function cb(data){
    console.log(data);
    
}
pendingPromise.then(cb)
