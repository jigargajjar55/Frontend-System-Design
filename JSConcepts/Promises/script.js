const githubURL = "https://api.github.com/users/jigargajjar55";

/*
Promise is a placeholder which will be filled with data after execution of async operation

The Promise object represents the eventual completion (or failure) of an asynchronous 
operation and its resulting value.


It will solve inversion of control.




const response = fetch(githubURL).then((resp) => {
    console.log(resp);

    if(resp){
        resp.json().then((data) => {
            console.log(data);
        })
    }
});


//Promise chaining - To resolve callback hell problem

//Callback hell - Code grow horizontal - Hard to maintain
createOrder(cart, 
    
    //We are passing function to api, Inversion of Control
    function(){

        proceedWithPayment(function(){

            showOrderSummary(
                function(){
                    updateWallet();
                }
            )
        })
    }
);

//Use Promise chaining - Code will grow vertically
createOrder(cart)
    .then(function(){
        return proceedWithPayment(orderId);
    }).then(function(){
        return showOrderSummary(paymentInfo);
    }).then(function(){
        return updateWallet(paymentInfo);
    });


*/

const cart = ["shoes", "mobile", "kurta"];

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    //validateCart
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }

    //Order created
    const orderId = "2s234";

    setTimeout(() => {
      resolve(orderId);
    }, 4000);
  });

  return pr;
}

function validateCart(cart) {
  return true;
}

function proceedWithPayment(orderId) {
  const pr = new Promise(function (resolve, reject) {
    if (1 < 5) {
      const err = new Error("Payment got failed!");
      reject(err);
    }

    resolve(`Payment has been done for Order: ${orderId}`);
  });

  return pr;
}

createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    return proceedWithPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch((error) => {
    console.log(error.message);
  });

//Promise APIs

/*

Promise.all() ---Wait for all promise fulfills

The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

Can't cancel the promise



*/

const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Promise1 is fulfiled");
  }, 5000);
  // setTimeout(() => {
  //     reject("Promise1 is rejected")
  // }, 5000);
});
const promise2 = new Promise(function (resolve, reject) {
  // setTimeout(() => {
  //     resolve("Promise2 is fulfiled")
  // }, 1000);

  setTimeout(() => {
    reject("Promise2 is rejected");
  }, 1000);
});
const promise3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Promise3 is fulfiled");
  }, 3000);

  // setTimeout(() => {
  //     reject("Promise3 is rejected")
  // }, 3000);
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
// Expected output: Array [3, 42, "foo"]

/*

Make parallel async call(APIs call)

Promise.allSettled()  ---Wait for all promise settled

The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.


*/

const promise11 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Promise11 is fulfiled");
  }, 5000);
  // setTimeout(() => {
  //     reject("Promise11 is rejected")
  // }, 5000);
});
const promise21 = new Promise(function (resolve, reject) {
  // setTimeout(() => {
  //     resolve("Promise21 is fulfiled")
  // }, 1000);

  setTimeout(() => {
    reject("Promise21 is rejected");
  }, 1000);
});
const promise31 = new Promise(function (resolve, reject) {
  // setTimeout(() => {
  //     resolve("Promise31 is fulfiled")
  // }, 3000);

  setTimeout(() => {
    reject("Promise31 is rejected");
  }, 3000);
});

Promise.allSettled([promise11, promise21, promise31]).then((results) => {
  console.log(results);
}).catch((err) => {
    console.log(err);
});


/*

Promise.race() ---Wait for first promise settled


The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles.

*/

const promise12 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("promise12 is fulfiled");
    }, 5000);
    // setTimeout(() => {
    //     reject("promise12 is rejected")
    // }, 5000);
  });
  const promise22 = new Promise(function (resolve, reject) {
    // setTimeout(() => {
    //     resolve("promise22 is fulfiled")
    // }, 1000);
  
    setTimeout(() => {
      reject("promise22 is rejected");
    }, 1000);
  });
  const promise32 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("promise32 is fulfiled")
    }, 3000);
  
    // setTimeout(() => {
    //   reject("promise32 is rejected");
    // }, 3000);
  });
  
  Promise.race([promise12, promise22, promise32]).then((results) => {
    console.log(results);
  }).catch((err) => {
      console.log(err);
  });
  

/*

Promise.any()  ---Wait for first promise fulfill

The Promise.any() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

*/


const promise13 = new Promise(function (resolve, reject) {
    // setTimeout(() => {
    //   resolve("promise13 is fulfiled");
    // }, 5000);
    setTimeout(() => {
        reject("promise13 is rejected")
    }, 5000);
  });
  const promise23 = new Promise(function (resolve, reject) {
    // setTimeout(() => {
    //     resolve("promise23 is fulfiled")
    // }, 1000);
  
    setTimeout(() => {
      reject("promise23 is rejected");
    }, 1000);
  });
  const promise33 = new Promise(function (resolve, reject) {
    // setTimeout(() => {
    //     resolve("promise33 is fulfiled")
    // }, 3000);
  
    setTimeout(() => {
      reject("promise33 is rejected");
    }, 3000);
  });
  
  Promise.any([promise13, promise23, promise33]).then((results) => {
    console.log(results);
    
  }).catch((err) => {
      console.log(err);
      console.log(err.errors);
  });
