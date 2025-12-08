
/*
//Debounce Concept:- 

Debounce in JavaScript is a technique used to control the rate at which a function
is executed.  
It ensures that the function is called only if the time difference between 
any 2 key events is greater than specified time delay. 
 


Use Cases:
1) Search bar suggestions
2) Auto-save function
3) Infinite scrolling
4) Window resizing events - How many time Window resizing happen
5) Live filtering

*/


let counter = 0;
//Fetch Data from server
const getDataAPI = (...args) => {

    console.log("Please fetched data:", args);

   console.log("Data Fetched!!");
  
}

const dbounceFunction = function(fn, delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);

    }
}

const getData = dbounceFunction(getDataAPI, 300);

const handleSearchBar = () => {

    const inputSearchBar = document.getElementById("searchBar");

     getData(inputSearchBar.value,"user");

}


/*

Throttling in JavaScript is a technique used to control the rate at which a function
is executed. 
It ensures that the function is called at most once in a specified time interval, 
no matter how frequently it's triggered. 



Use Cases:
1) Track window resizing events: How often Window resizing happen

Shooting Game:

1) For Machine gun, pistol ---Throttling will be useful for API call






*/


const expensiveFunction = () => {
    console.log("Resizing is happening...");

}

const throttleFunction = function(fn, timeInterval){

    let isFunctionNotExecuted = true;

    return function(...args){

        if(isFunctionNotExecuted){

            fn(...args);
            isFunctionNotExecuted = false;

            setTimeout(() => {
                isFunctionNotExecuted = true;
            },timeInterval);
        }
    }
}

const betterExpensiveFunction = throttleFunction(expensiveFunction, 500);




window.addEventListener("resize", betterExpensiveFunction);

