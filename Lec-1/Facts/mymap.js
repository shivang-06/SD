let arr = [1,2,3,4,5]
function squarer(x){
    return x*x;
}
let newarr = [];

function mymap(arr,cb){
    for(let i=0;i<arr.length;i++){
        newarr[i] = cb(arr[i])
    }
}
mymap(arr,squarer)
console.log(newarr);
