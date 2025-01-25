
const userDetail1 = {
    firstName: "Jigar",
    lastName: "Gajjar",
    printFullName: function(){
        console.log(this.firstName + " "+this.lastName);
    }
}

//userDetail1.printFullName();

const userDetail2 = {
    firstName: "Neel",
    lastName: "Gajjar",
}


//Using call we can use function borrowing
//We can borrow the function from another object
//It execute function as soon as call() function called
//userDetail1.printFullName.call(userDetail2);


const getFullName = function(city,state){
    console.log(this.firstName + " "+this.lastName + " from "+city+", "+state);
  
}

//getFullName.call(userDetail2, "Surat", "Gujarat");


//PollyFill of Call
Function.prototype.myCall = function(context, ...args){

    const fn = this;

    //Function checks
    if(typeof fn !== 'function'){
        throw new TypeError("myCall should call on functions");
    }

    //Context cheks
    context = (context !== null && context !== undefined) ? context : globalThis;

    // it shoud be unique
    const uniqueKey = Symbol();
    context[uniqueKey] = fn;

    // Call the function with the provided arguments
    const result = context[uniqueKey](...args);

    // Remove the unique property to avoid side effects
    delete context[uniqueKey];

    return result;
}

//getFullName.myCall(userDetail2, "Surat", "Gujarat");






