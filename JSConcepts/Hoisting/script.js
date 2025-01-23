

/*

JS run the code in Execution Context.
2 Phases: 1) Memory Allocation, 2) Code Execution

In first phase, it will allocate variable with "undefined" value
and function with whole function code.

In second phase, It execute the code line by line.


let & const variables are also hoisted,
but it will be in temporal dead zone till the value got assigned to variable.
(It will be allocate to separate memory)


*/


getName();
console.log(x);

var x = 7;

function getName(){
    console.log("Hello World!");
}

