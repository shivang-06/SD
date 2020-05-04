function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10); // if we use reject here, it will throw an error
        },1000)
    })
}

let pendingPromise = promiseCreator()
console.log(pendingPromise); // At this stage promise will always be pending

function resolve(data){
    console.log(data);
    
    return 20;    
}
function reject(err){
    console.log(err);
}
const pPromiseFromThen =    pendingPromise.then(resolve,reject)
console.log(pPromiseFromThen);

setTimeout(function(){
    console.log("--------------------------------------------------------------");
    
    console.log(pPromiseFromThen);
    
},1500)
