let fs = require("fs")


function promisifyfs(path) {
    let createPromise = new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })

    })
    return createPromise;
}

let fileWillBeREadPromise = promisifyfs("f1.txt")

fileWillBeREadPromise.then(function(data){

})
fileWillBeREadPromise.catch(function(err){

})