//Function statements aka function declaration
function a() {
  console.log("a is called!");
}

//Function expression -- can be passed as value to variable
var b = function () {
  console.log("b is called");
};

//Anonymous function
/*

function(){

}
*/

//Name function expression
var c = function xyz() {
  console.log("b is called");
};

//Diff between function params or arguments
function func1(param1, param2) {}

//we pass arguments when we call the function
func1(1, 2);

//First Class Functions or First Class Citizen
/*

First-class functions when functions in that language are treated like any other variable. 
For example, in such a language, a function can be passed as an argument to other functions, 
can be returned by another function and can be assigned as a value to a variable.

*/

//Callback function
function x2() {
  console.log("x2");
}

//Higher Order function
function y2(fn1) {
  fn1();
}

y2(x2);

//JS is a synchronous and single-threaded language
//Callback function
//Due to Callback function, it can acheive async nature
// setTimeout(function(){
//     console.log("Timer");
// },2000);

let i = 0;
document.getElementById("buttonA").addEventListener("click", function () {
  console.log("Button clicked: ", ++i);
});

function funCounter() {
  let count = 0;
  document.getElementById("buttonB").addEventListener("click", function () {
    console.log("Button clicked: ", ++count);
  });
}

funCounter();

function area(radius) {
  return Math.PI * radius * radius;
}

function calculate(arr, fn) {
  const output = [];

  for (let i = 0; i < arr.length; i++) {
    output.push(fn(arr[i]));
  }

  return output;
}

const radiusArr = [3, 2, 6, 5, 4];

console.log(calculate(radiusArr, area));
console.log(radiusArr.map(area));

console.log(typeof radiusArr);

Array.prototype.calculateMap = function (fn) {
  console.log(this);
  const output = [];

  for (let i = 0; i < this.length; i++) {
    output.push(fn(this[i]));
  }

  return output;
};

console.log(radiusArr.calculateMap(area));
