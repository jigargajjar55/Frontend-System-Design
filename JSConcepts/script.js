const githubURL = "https://api.github.com/users/jigargajjar55";

//Debouncing concept
let counter = 0;
const getData = async () => {
  //Call the api and get data
  //console.log("Fetching data..", counter++);
  const resp = await fetch(githubURL);

  if(resp !== undefined){

    const userData = await resp.json();

    console.log(userData);

  }
  
};

const debounce = (fn, delay) => {
  let timer;

  return function () {
    const context = this,
      args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
};

const betterFunction = debounce(getData, 400);

// //Call, apply, bind
// let userInfo1 = {
//     firstName: "Jigarkumar",
//     lastName: "Gajjar",

// }

// const getFullName = function(homeTown,state){
//     console.log(this.firstName +" "+ this.lastName+" from "+homeTown+", "+state);
// }

// getFullName.call(userInfo1,"Surat", "Gujarat");

// let userInfo2 = {
//     firstName: "Neelkumar",
//     lastName: "Gajjar",
// }

// //function borrowing
// getFullName.call(userInfo2, "Mumbai", "Maharastra");

// getFullName.apply(userInfo2,["Mumbai", "Maharastra"]);

// const printFullName = getFullName.bind(userInfo2,"Mumbai", "Maharastra");

// printFullName();

// //Closures
// const z = () => {
//     var b = 900;
//     const x = () => {

//         let a = 5;
//         const y = () => {
//             console.log(a,b);
//         }
//         a = 100;
//         return y;
//     }
//     return x();

// }

// const fr = z();

// fr();

//Function curring
// const multiply = (a,b) => {
//     return (a * b);
// }

// const multiplyByTwo = multiply.bind(this, 2);

// console.log(multiplyByTwo(5));

// function multiply(x){

//     return function(y){
//         return (x * y);
//     }

// }

// console.log(multiply(5)(6));

// const sum = (a) =>{

//     return (b) =>{

//         if(b){
//             return sum(a + b);
//         }
//         return a;
//     }

// }

// console.log(sum(1)(2)(3)(4)(5)());

//Polyfill for bind

// let userInfo = {
//     firstName: "Jigarkumar",
//     lastName: "Gajjar",

// }

// const getFullName = function(homeTown,state){
//     console.log(this.firstName +" "+ this.lastName+" from "+homeTown+", "+state);
// }

// const printFullName = getFullName.bind(userInfo,"Surat", "Gujarat");

// printFullName();

// Function.prototype.myBind = function(...args){

//     const obj = this;
//     let params = args.slice(1);

//     return function(...args1){

//         params = [...params,...args1];
//         obj.apply(args[0],params);
//     }

// }

// const printFullName1 = getFullName.myBind(userInfo, "surat");

// printFullName1("gujarat");

//Promises

// const githubURL = "https://api.github.com/users/jigargajjar55";

// const promise = fetch(githubURL);

// console.log(promise);

// promise.then(async (data) => {

//     const res = await data.json();
//     console.log(res);
// })



//If we pass eventCapture flag: false, it will do Event Bubbling
//If we pass eventCapture flag: true, it will do Event Capturing/Trickling

//First it will do event capturing and then event bubbling
// document.querySelector("#grandParent").addEventListener("click", () => {
//     console.log("GrandParent is clicked!");
//   },false);
  
//   document.querySelector("#parent").addEventListener("click", (e) => {   
//     console.log("Parent is clicked!");
//     e.stopPropagation();
//   },false);
  
//   document.querySelector("#child").addEventListener("click", () => {
//     console.log("Child is clicked!");
//   },false);






  document.querySelector('#category').addEventListener("click", (e) => {

    
    console.log(e);
    if(e.target.nodeName === "LI"){
        window.location.href = "/"+e.target.id;
    }
    

  });