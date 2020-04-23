let arr = [4, 14, 17, 23, 48, 66];

//callback function
function change(num) {
    if (num % 2 == 0) {
        return ++num;
    } else {
        return --num;
    }
}


//Creating prototype method

let newarr = [];
Array.prototype.mymap = function (cb) {
    for (let i = 0; i < this.length; i++) {
        newarr[i] = cb(arr[i])
    }
    return newarr
}
let myarr = arr.mymap(change)

console.log(myarr);

