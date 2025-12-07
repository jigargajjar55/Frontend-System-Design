/*

This is a staple Functional Programming question. 
It tests your ability to use Higher-Order Functions and specifically Array.prototype.reduce().
The Concept is Both utilities chain multiple functions together. 
The only difference is the direction of execution.

*/

const incrementNumber = (num) => num + 1;
const doubleNumber = (num) => num * 2;
const squareNumber = (num) => num * num;

//Using JavaScript Reduce Utility Function to implement Pipe
const pipeUsingUtility = (...functionArr) => {
  return (initialValue) => {
    return functionArr.reduce((currValue, currFunction) => {
      return currFunction(currValue);
    }, initialValue);
  };
};

// Pipe (Left-to-Right): fn1 -> fn2 -> fn3. It reads like a list of steps: "First do this, then that."
const pipedFunction = pipeUsingUtility(
  incrementNumber,
  doubleNumber,
  squareNumber
);

console.log("Result of Pipe Function using Utility function", pipedFunction(2));

//Using iterative approach to implement Pipe
const pipeUsingIterative = (...functionArr) => {
  return (intitalValue) => {
    let result = intitalValue;

    for (const fn of functionArr) {
      result = fn(result);
    }

    return result;
  };
};

const pipedFunctionIterative = pipeUsingIterative(
  incrementNumber,
  doubleNumber,
  squareNumber
);

console.log(
  "Result of Pipe Function using Iterative Approach",
  pipedFunctionIterative(2)
);

//Using JavaScript Reduce Utility Function to implement Compose
const composeUsingUtility = (...functionArr) => {
  return (initialValue) => {
    return functionArr.reduceRight((currValue, currFunction) => {
      return currFunction(currValue);
    }, initialValue);
  };
};

// Compose (Right-to-Left): fn3 <- fn2 <- fn1. It mimics mathematical function composition: $f(g(x))$.
const composedFunction = composeUsingUtility(
  squareNumber,
  incrementNumber,
  doubleNumber
);

console.log("Result of Compose Function", composedFunction(2));

//Using iterative approach to implement Compose

const composeUsingIterative = (...functionArr) => {
  return (initialValue) => {
    let result = initialValue;

    for (let i = functionArr.length - 1; i >= 0; i--) {
      const fn = functionArr[i];
      result = fn(result);
    }

    return result;
  };
};

const composedFunctionIterative = composeUsingIterative(
  squareNumber,
  incrementNumber,
  doubleNumber
);

console.log(
  "Result of Compose Function using Iterative Approach",
  composedFunctionIterative(2)
);
