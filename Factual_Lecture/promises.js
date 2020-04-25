let fs = require("fs")


function promisisfy(path) {
    let fileWiilBeReadPromise = new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })

    })
}