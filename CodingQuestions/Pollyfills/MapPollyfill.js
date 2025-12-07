const arr1 = [1, 2, 3, 4, 5];

const area = (radius) => {
  return Math.PI * radius * radius;
};

const getBinary = (num) => {
  return num.toString(2);
};

//Will return new array with modified value based on callback function
const output = arr1.map(area);
const outputbinArray = arr1.map(getBinary);

/*

console.log("Output Array: ",output);
console.log("Binary Array: ", outputbinArray);
console.log("Original Array: ",arr1);


*/

//Pollyfill of Map

Array.prototype.myMap = function (callBackFn) {
  //Edge Case
  if (typeof callBackFn !== "function") {
    throw new TypeError(callBackFn + " is not a function.");
  }

  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callBackFn(this[i]));
  }

  return output;
};

/*

console.log(arr1.myMap(area));
console.log(arr1.myMap(getBinary));
console.log(arr1.myMap(10));

*/
