
const myIsArray = (inputArray) =>{


    return Object.prototype.toString.call(inputArray) === '[object Array]';

}


console.log(myIsArray([1, 2, 3])); // true
console.log(myIsArray('Hello')); // false