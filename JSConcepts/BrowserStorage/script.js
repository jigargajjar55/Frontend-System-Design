
const userDetails = {
    firstName: "Jigarkumar",
    lastName: "Gajjar",
    age: 25
}

/*

Browser will store values as key-value pair
String -> String, That's why we need stringify for object

*/

//Local Storage
localStorage.setItem("userDetails", JSON.stringify(userDetails));

const obj = localStorage.getItem("userDetails");

console.log(JSON.parse(obj));

