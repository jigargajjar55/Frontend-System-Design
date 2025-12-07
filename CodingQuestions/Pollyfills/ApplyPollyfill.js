const userDetail10 = {
    firstName: "Jigar",
    lastName: "Gajjar",
}


const userDetail20 = {
    firstName: "Neel",
    lastName: "Gajjar",
}

const getFullName1 = function(city, state){
    return (this.firstName + " "+this.lastName + " from "+city+", "+state);
  
}

//It execute function as soon as apply() function called
//It same as call function but only difference is it takes arguments as arraylist
console.log(getFullName1.apply(userDetail10, ["Surat", "Gujarat"]));

//PollyFill of Apply
Function.prototype.myApply = function(context, args){

    const fn = this;

    //Function checks
    if(typeof fn !== 'function'){
        throw new TypeError('myApply should call on function');
    }

    // Ensure args is an array
    if (!Array.isArray(args)) {
        throw new TypeError("The second argument must be an array");
    }

    //Context checks
    context = (context !== null && context !== undefined) ? context : globalThis;


    const uniqueKey = Symbol();
    context[uniqueKey] = fn;
    

    const result = context[uniqueKey](...args);

    // Remove the unique property to avoid side effects
    delete context[uniqueKey];

    return result;

}

console.log(getFullName1.myApply(userDetail10, ["Surat", "Gujarat"]))
