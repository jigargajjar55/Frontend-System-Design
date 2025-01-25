const arr2 = [1,2,3,4,5];

function isOdd(val){
    return ((val % 2) !== 0);
}
function isEven(val){
    return ((val % 2) === 0);
}
function filterFun(val){
    return (val > 4);
}

const output2 = arr2.filter(filterFun);

/*

console.log(output2);
console.log(arr2);

*/

Array.prototype.myFilter = function(callBackFn){


    //Edge Case
    if(typeof callBackFn !== 'function'){
        throw new TypeError(callBackFn + " is not a function");
    }

    const output = [];

    for(let i=0; i<this.length; i++){
        
        if(callBackFn(this[i])){
            output.push(this[i]);
        }
    }

    return output;
}


/*
const resul12 = arr2.myFilter(filterFun);

console.log(resul12);

*/





