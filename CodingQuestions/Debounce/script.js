
/*
//Debounce Concept:- Use Cases

1) Search bar suggestions
2) Auto-save function
3) Infinite scrolling
4) Window resizing events
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
            fn.apply(this,...args);
        }, delay);

    }
}

const getData = dbounceFunction(getDataAPI, 300);

const handleSearchBar = () => {

    const inputSearchBar = document.getElementById("searchBar");

     getData([inputSearchBar.value,"user"]);

}

