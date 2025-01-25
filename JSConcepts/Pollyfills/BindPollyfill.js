const userDetail11 = {
    firstName: "Jigar",
    lastName: "Gajjar",
}


const userDetail21 = {
    firstName: "Neel",
    lastName: "Gajjar",
}

const getFullName11 = function(city,state, country){
    console.log(this.firstName + " "+this.lastName + " from "+city+", "+state+", "+country);
  
}

//Bind function bind copy of function to object, so it can use it later
const getUserName1 = getFullName11.bind(userDetail21,"Surat", "Gujarat", "India");


/*

console.log(getUserName1);
getUserName1();

*/




//PollyFill of Bind
Function.prototype.myBind = function(context,...args){

    const fn = this;

    //Checks
    if(typeof fn !== 'function'){
        throw new TypeError("myBind must be call on function");
    }

    // Ensure context is an object
    context = (context !== null && context !== undefined) ? context : globalThis

    const params = args;

    return function(...args2){

        fn.apply(context, [...params, ...args2]);

    }
}

/*

const getUserName2 = getFullName11.myBind(userDetail11,"Surat");
getUserName2("Gujarat","India");

*/