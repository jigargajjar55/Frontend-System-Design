"use strict";

//this in global space

console.log(this);

//this inside a function

function func() {
  let a = 10;
  //the value depends on strict/non-strict mode
  console.log(this);
}

//refer to global object if its in Non-strict mode
func();

//this in strict mode - (this substitution)
/*
If the value of this keyword is undefined or null
this keyword will be replaced with globalObject only in non-strict mode

*/

//this keyword value depends on how the function is called(window)
window.func();

//this keyword inside object's method
const userObj = {
  firstName: "Jigarkumar",
  lastName: "Gajjar",
  func: function () {
    console.log(this.firstName + " " + this.lastName);
  },
};

userObj.func();

//call, apply, bind methods(sharing methods)

const userObj1 = {
  firstName: "Neelkumar",
  lastName: "Gajjar",
};

userObj.func.call(userObj1);

userObj.func.apply(userObj1);

//this keyword inside arrow function
/*

In arrow functions, this retains the value of the enclosing lexical context's this. In other words, when evaluating an arrow function's body, the language does not create a new this binding.
*/

const obj = {
  a: 10,
  func: () => {
    console.log(this);
  },
};

obj.func();

//this keyword inside nested arrow functions

const obj2 = {
    a: 10,
    func: () => {

        //Enclosing lexical context
        const y = () => {
            console.log(this);
        }

        y();
      
    },
  };
  
  obj2.func();




//this keyword in DOM elements
//Output: Reference to HTML element
