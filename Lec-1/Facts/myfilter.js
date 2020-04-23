let arr = [1,2,3,4,5]

function filterPrime(number){
    if(number<=1){
        return false
    }
    if(number==2){
        return true;
    }
    for(let i = 2 ; i<=number ; i++){
        if(number % i == 0){
        return false
    }
    
}
return true;
}

let newarr=[];
function myfilter(arr , cb){
    for(let i=0;i<arr.length;i++){
        if(cb(i)==true){
            newarr.push(arr[i])
        }
    }
    return newarr;
}

let myarr=myfilter(arr,filterPrime);
console.log(myarr);
