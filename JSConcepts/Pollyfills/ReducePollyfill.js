const arr3 = [100,800,10,70,30,40,50,60,20,90];

//Array.reduce will return single value result(Sum/Min/Max)
const sumFun = (acc, curr) => {
    acc = acc + curr;
    return acc;
}

const output3 = arr3.reduce(sumFun, 0);
const outp3 = arr3.reduce((acc,curr) => {
    if(acc < curr){
        acc = curr;
    }
    return acc;
}, 0);

// console.log(output3);
// console.log(outp3);

// console.log(arr3);


const users = [
    {firstName: "Jigar", lastName: "Gajjar", age: 25},
    {firstName: "Neel", lastName: "Gajjar", age: 21},
    {firstName: "Raj", lastName: "Rana", age: 25},
    {firstName: "Sumayya", lastName: "Taj", age: 35},
];

const fullNamesOfAllUsers = users.map((val,index) => {
    return `${val.firstName} ${val.lastName}`;
});

//console.log(fullNamesOfAllUsers);

//Give User count based on age
const ageGroup = {};

users.map((val, index) => {

    if(!ageGroup[val.age]){
        ageGroup[val.age] = 0;
    }

    ageGroup[val.age] += 1;
})

//console.log(ageGroup);


const outp2 = users.reduce((acc, curr) => {

    if(!acc[curr.age]){
        acc[curr.age] = 0;
    }
    acc[curr.age] += 1;

    return acc;

}, {});

//console.log(outp2);

const outp1 = users.filter((val) => (val.age < 30)).map((val) => val?.firstName);


//console.log(outp1);

const outpu1 = users.reduce((acc,curr) => {

    if(curr.age < 30){
        acc.push(curr.firstName);
    }

    return acc;

}, []);

//console.log(outpu1)

Array.prototype.myReduce = function(callBackFn, initialValue){

    //Edge case
    if(typeof callBackFn !== 'function'){
        throw new TypeError(callBackFn + " is not a function.");
    }

    let accumulate = (initialValue !== undefined) ? initialValue : this[0];
    let index = (initialValue !== undefined) ? 0 : 1;

    while(index < this.length){
        accumulate = callBackFn(accumulate, this[index]);
        index++;
    }

    return accumulate;

}

/*

console.log(arr3.myReduce(sumFun, 0));

console.log(users.myReduce((acc, curr) => {

    if(!acc[curr.age]){
        acc[curr.age] = 0;
    }
    acc[curr.age] += 1;

    return acc;

}, {}));

console.log(users.myReduce((acc,curr) => {

    if(curr.age < 30){
        acc.push(curr.firstName);
    }

    return acc;

}, []));


*/