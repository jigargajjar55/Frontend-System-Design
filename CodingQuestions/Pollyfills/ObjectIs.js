/*

Object.is() polyfill

Need to consider the following cases:
1. NaN is considered equal to NaN
2. +0 and -0 are not considered equal
3. All other values are compared using the strict equality operator (===)


*/

const areObjectsEqual = (val1, val2) => {

    //Check for +0 and -0 are not considered equal
    if(val1 === 0 && val2 === 0){
        return ((1 / val1) === (1 / val2));
    }

    //Check for NaN is considered equal to NaN
    if(val1 !== val1){        
        return (val2 !== val2);
    }

    return (val1 === val2);
}

console.log(areObjectsEqual(10, 10)); // true
console.log(areObjectsEqual(NaN, NaN)); // true
console.log(areObjectsEqual(+0, -0)); // false
console.log(areObjectsEqual('sb', 'sb')); // true
console.log(areObjectsEqual('sb', 10)); // false
