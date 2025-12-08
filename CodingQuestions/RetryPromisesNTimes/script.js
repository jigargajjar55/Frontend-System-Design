const fetchDataAPI = () => {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.8;

    if (isSuccess) {
      resolve("Data is Fetched successfully!");
    } else {
      reject("Not able to fetch data!!!!!");
    }
  });
};

const retryPromise = (fn, retries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      console.log("Attempt No.:", retries - n + 1);
      fn()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (n <= 1) {
            reject(error);
          } else {
            setTimeout(() => {
              attempt(n - 1);
            }, delay);
          }
        });
    };

    attempt(retries);
  });
};

retryPromise(fetchDataAPI)
  .then((result) => {
    console.log("Successfully run!!", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
