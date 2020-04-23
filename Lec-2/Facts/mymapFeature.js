function squarer(n){
    return n*n;
}
//This code will add mymap feature to all the arrays in the same file.
Array.prototype.mymap = function (cb){
    let newarr = [];
    for(let i=0;i<this.length;i++){
        let val = cb(this[i])
        newarr.push(val)
    }
    return newarr
}

var arr = [2,7,5,12,10,3,4];
let squaredArr= arr.mymap(squarer)
console.log(squaredArr);
