const loggedInUsers = [
    {firstName: "Jigar", lastName: "Gajjar", age: 25},
    {firstName: "Neel", lastName: "Gajjar", age: 21},
    {firstName: "Raj", lastName: "Rana", age: 25},
    {firstName: "Sumayya", lastName: "Taj", age: 35},
];

//Every function will return true, if all elements in array satisfy the condition
//It will return false, if any one element doesn't satisfy condition

/*
console.log("Does every user are 18 year old or above? ",
     loggedInUsers.every((val) => val.age >= 18)
    )
*/


Array.prototype.myEvery = function(callBackFn){

    //Edge case
    if(typeof callBackFn !== 'function'){
        throw new TypeError(callBackFn + " is not a function");
    }

    let flag = true;

    for(let i=0; i<this.length; i++){
        if(!callBackFn(this[i])){
            flag = false;
            break;
        }
    }
    return flag;
}
/*

console.log("Does every user are 18 year old or above? ",
    loggedInUsers.myEvery((val) => val.age >= 18)
   )

*/