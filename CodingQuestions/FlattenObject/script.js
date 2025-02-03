const userDetails = {
  name: "Vishal",
  age: 28,
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: null,
      },
    },
    secondary: null,
  },
  phones: [
    { type: "home", number: "1234567890" },
    { type: "work", number: null },
  ],
  preferences: null,
  arr:[
    {b: [0]},
    {c: [1]}
  ]
};

/*
// output
let ouput = {
    user_name: "Vishal",
    user_age: null,
    user_address_primary_house: "109",
    user_address_primary_street_main: "21",
    user_address_primary_street_cross: null,
    user_address_secondary: null,
    user_phones_0_type: "home",
    user_phones_0_number: "1234567890",
    user_phones_1_type: "work",
    user_phones_1_number: null,
    user_preferences: null
}

*/

const flattenObjectFunction = (userObject, parentName) => {
  let resultObj = {};

  for (let key in userObject) {


    if(!userObject.hasOwnProperty(key)){
        continue;
    }


    if (typeof userObject[key] === "object" && userObject[key] !== null) {
      const childObj = flattenObjectFunction(
        userObject[key],
        `${parentName}_${key}`
      );
      resultObj = {
        ...resultObj,
        ...childObj,
      };
    } else if (Array.isArray(userObject[key])) {
      const childArr = userObject[key];

      for (const {val,index} in childArr) {
        
        const childObj = flattenObjectFunction(
          val,
          `${parentName}_${key}_${index}`
        );
        resultObj = {
          ...resultObj,
          ...childObj,
        };
      }
    } else {
      resultObj[`${parentName}_${key}`] = userObject[key];
    }
  }

  return resultObj;
};

console.log(flattenObjectFunction(userDetails, "user"));
