const promiseTask1 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("Result from Task 1");
  //   }, 4000);

  setTimeout(() => {
    reject("Error from Task 1");
  }, 4000);
});
const promiseTask2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result from Task 2");
  }, 1000);

  //   setTimeout(() => {
  //     reject("Error from Task 2");
  //   }, 1000);
});
const promiseTask3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result from Task 3");
  }, 3000);

  //   setTimeout(() => {
  //     reject("Error from Task 3");
  //   }, 3000);
});
const promiseTask4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result from Task 4");
  }, 2000);

  // setTimeout(() => {
  //     reject('Error from Task 4');
  // }, 2000);
});

/*

const promiseAllResultsUsingUtilty = Promise.all([promiseTask1, promiseTask2, promiseTask3, promiseTask4]).then((results) => {
    console.log("All Promise Tasks completed using utility");
    console.log(results);
}).catch((error) => {
    console.log("One of the Promise Task failed using utility");
    console.log(error);
})

*/

Promise.myAll = function (iterablePromise) {
  return new Promise((resolve, reject) => {
    if (
      !iterablePromise ||
      typeof iterablePromise[Symbol.iterator] !== "function"
    ) {
      return reject(new TypeError(`arguments is not iterable`));
    }

    const promiseTasks = Array.from(iterablePromise);

    if (promiseTasks.length === 0) {
      return resolve([]);
    }
    const results = [];
    let completedCount = 0;

    promiseTasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((response) => {
          results[index] = response;
          completedCount += 1;

          if (completedCount === promiseTasks.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

/*

const promiseAllResultsUsingPollyfill = Promise.myAll([
  promiseTask1,
  promiseTask2,
  promiseTask3,
  promiseTask4,
])
  .then((results) => {
    console.log("All Promise Tasks completed using Pollyfill");
    console.log(results);
  })
  .catch((error) => {
    console.log("One of the Promise Task failed using Pollyfill");
    console.log(error);
  });

  


const promiseAllSettledResultsUsingUtility = Promise.allSettled([
  promiseTask1,
  promiseTask2,
    promiseTask3,
    promiseTask4]).then((results) => {
    console.log("All Promise Tasks settled using utility");
    console.log(results);
}).catch((error) => {    
    console.log(error);
})

*/

Promise.myAllSettled = function (iterablePromise) {
  return new Promise((resolve, reject) => {
    if (
      !iterablePromise ||
      typeof iterablePromise[Symbol.iterator] !== "function"
    ) {
      return reject(new TypeError("Arugument is not iterable"));
    }

    const promiseTasks = Array.from(iterablePromise);

    if (promiseTasks.length === 0) {
      return resolve([]);
    }

    const results = [];
    let completedCount = 0;

    promiseTasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((response) => {
          results[index] = { status: "fulfilled", value: response };
        })
        .catch((error) => {
          results[index] = { status: "rejected", value: error };
        })
        .finally(() => {
          completedCount += 1;
          if (completedCount === promiseTasks.length) {
            resolve(results);
          }
        });
    });
  });
};

/*
const promiseAllSettledResultsUsingPollyfills = Promise.myAllSettled([
  promiseTask1,
  promiseTask2,
  promiseTask3,
  promiseTask4,
])
  .then((results) => {
    console.log("All Promise Tasks settled using Pollyfill");
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

  */

/*

const promiseAnyResultsUsingUtility = Promise.any([
  promiseTask1,
  promiseTask2,
    promiseTask3,
    promiseTask4]).then((result) => {
    console.log("Atleast one Promise Task fulfilled using utility");  
    console.log(result);  
    }).catch((error) => {    
    console.log("All Promise Tasks are rejected using utility");
    console.log(error);
})

*/

Promise.myAny = function (iterablePromise) {
  return new Promise((resolve, reject) => {
    if (
      !iterablePromise ||
      typeof iterablePromise[Symbol.iterator] !== "function"
    ) {
      return reject(new TypeError("Argument is not iterable"));
    }

    const promisesTasks = Array.from(iterablePromise);

    if (promisesTasks.length === 0) {
      return reject(new AggregateError([], "All Promises are rejected"));
    }

    const result = [];
    let rejectedCount = 0;

    promisesTasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          result[index] = error;
          rejectedCount += 1;

          if (rejectedCount === promisesTasks.length) {
            reject(new AggregateError(result, "All Promises are rejected"));
          }
        });
    });
  });
};

/*

const promiseAnyResultsUsingPollyfill = Promise.myAny([
  promiseTask1,
  promiseTask2,
  promiseTask3,
  promiseTask4,
])
  .then((result) => {
    console.log("Atleast one Promise Task fulfilled using Pollyfill");
    console.log(result);
  })
  .catch((error) => {
    console.log("All Promise Tasks are rejected using Pollyfill");
    console.log(error);
  });

  */

/*
const promiseRaceResultsUsingUtility = Promise.race([
  promiseTask1,
  promiseTask2,
  promiseTask3,
  promiseTask4,
])
  .then((result) => {
    console.log("First settled Promise Task using utility");
    console.log(result);
  })
  .catch((error) => {
    console.log("error: ", error);
  });

*/

Promise.myRace = function (iterablePromise) {
  return new Promise((resolve, reject) => {
    if (
      !iterablePromise ||
      typeof iterablePromise[Symbol.iterator] !== "function"
    ) {
      return reject(new TypeError("Argument is not iterable"));
    }

    const promiseTasks = Array.from(iterablePromise);

    //In Promise.race, if the iterable is empty, the returned promise will be forever pending.
    //So we are not handling that case here.

    promiseTasks.forEach((task) => {
      Promise.resolve(task)
        .then((resp) => {
          return resolve(resp);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  });
};

const promiseRaceResultsUsingPollyfill = Promise.myRace([
  promiseTask1,
  promiseTask2,
  promiseTask3,
  promiseTask4,
])
  .then((result) => {
    console.log("First settled Promise Task using Pollyfill");
    console.log(result);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
