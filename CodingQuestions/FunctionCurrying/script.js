/*

Currying is a functional programming technique where a function with multiple 
arguments is transformed into a series of functions, each taking a single argument.

Instead of taking all arguments at once, the curried function takes the first argument, 
returns a new function that takes the next argument, and so on until all arguments are provided. 
The final function then returns the result.

In simpler terms, currying breaks down a function that takes multiple parameters into a chain of 
functions that each take one parameter.

*/

const multiply = function (x, y) {
  return x * y;
};

const multiplyWithclosures = function(x){

    return function(y){
        return (x * y);
    }
}

const multiplyByTwo = multiplyWithclosures(2);

console.log(multiplyByTwo(7));
console.log(multiplyByTwo(3));

const multiplyByThree = multiply.bind(this, 3);

console.log(multiplyByThree(9));


//Interview question

/*

sumFun(1)(2)(3)(4)...(n)()

*/



const sumFun = (a) => {

    return (b) => {

        if(b !== undefined){
            return sumFun(a + b);
        }

        return a;
    }
}

const sumfun1 = (a) => (b) => (b !== undefined) ? sumfun1(a + b) : a;

console.log("Result of Sum: ", sumfun1(1)(2)(3)(4)());

const multiplyFun = (a) => {
    return (b) => {

        if(b !== undefined){
            return multiplyFun(a * b);
        }

        return a;
    }
}

console.log("Result of Multiply: ", multiplyFun(1)(2)(3)(4)());


