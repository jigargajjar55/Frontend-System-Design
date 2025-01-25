/*

A closure is the combination of a function bundled together (enclosed) 
with references to its surrounding state (the lexical environment). 
In other words, a closure gives a function access to its outer scope. 
In JavaScript, closures are created every time a function is created, 
at function creation time.

Use cases of Closures:
-Module Design Pattern
-Currying
-Functions like once
-Memoized
-Maintaining state in async world
-setTimeouts
-Iterators


Disadvantages of Closures:
-OverConsumption of memory because of closures
-Sometimes the variables are not garbage collected because program still going on
-Can happen to memory leak if not handle properly


*/

function x(b) {
  let a = 8;

  function yl(){
    console.log(90);
  }

  function y() {
    
    yl();
    console.log(a, b);
  }
  a = 100;
  return y;
}
const z = x(789);
//console.log(z);

//output: 100
//z(); 




function a1(){
    var b = 105;

    function x1() {
        let a = 8;
      
        function y1() {
          console.log(a,b);
        }
        a = 100;
        y1();
    }
    x1();
}
//a1();


//setTimeout and Closures examples
function fun1(){

  var i = 1;
  setTimeout(function(){
    console.log(i);
  },3000);
}

//output: 1 after 3 seconds
//fun1();

function fun2(){

  for(let counter = 1; counter<=5; counter++){
    setTimeout(() => {

      console.log(counter);

    }, (counter * 1000));
  }  
}

//output: print number based on seconds
//use let instead of var because 
// let is block scope, it will create copy of the value of the variable each time and form closure
//var is function scope

//fun2();

//use var declared variable only
function fun3(){

  for(var counter = 1; counter<=5; counter++){
    
    //Form closure by creating inner function
    //pass the var variable, so it will be passed as copy of the variable and form closure
    function close(y){

      setTimeout(() => {

        console.log(y);
  
      }, (counter * 1000));

    }

    close(counter);    
    
  }  
}

//output: print number based on seconds

//fun3();


function counterFun(){

  let count = 0;
  return function incrementCounter(){
    count++;
    console.log(count);
  }

}

// const counter1 = counterFun();
// counter1();
// counter1();

// const counter2 = counterFun();
// counter2();




function Counter(){

  let count = 0;

  this.incrementCounter = function(){
    count++;
    console.log(count);
  }

  this.decrementCounter = function(){
    count--;
    console.log(count);
  }

}

const counter11 = new Counter();
counter11.incrementCounter();
counter11.incrementCounter();


counter11.decrementCounter();













