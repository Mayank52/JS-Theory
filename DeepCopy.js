// Shallow Copy -> Copy just the memory address of the object, any changes in new object will reflect in original object
// Deep Copy -> Make an entirely new object at a new memory, and give it the same value as given object
/*
Ways to copy:
1. Spread Operator
    Spread Operator will only make a deep copy of the first level of the object
    Eg:
    In the person object
    We have a nested object: 'address'
    But address in itself is also an object, so it is also just a memory address
    And spread operator will only deep copy the first level
    For any nested objects it copies memory addreses only

2. To make a proper Deep copy we have to copy all nested objects seperately

 */
let person = {
  firstName: "John",
  lastName: "Doe",
  address: {
    street: "North 1st street",
    city: "CA",
  },
  movies: [{ name: "Die Hard", rating: 5 }, "First Avenger"],
};

let newPerson;

// 1. Spread operator -> Only Deep Copies Top level
let newPerson = { ...person };
// newPerson.lastName = "Singh";
// newPerson.movies = ["ABC", "DEF"];
// newPerson.address.city = "abc"; // Nested Object, Shallow Copy is made by spread Operator

// 2. Polyfill of Deep Copy : Recursion to Make Deep Copy of all nested objects
let deepCopy = (obj) => {
  // if are making deep copy of array, then we have return an array
  // if we are copying an object, then we return an object
  // So, we check if obj is an array, and according to that initialize the clone as an array or object
  let isArr = Array.isArray(obj);
  let clone = isArr ? [] : {};

  Object.keys(obj).map((key) => {
    if (Array.isArray(obj[key])) {
      clone[key] = [...obj[key]];

      // if the object has an array of object, deep clone them as well
      /* Eg: obj = {
          arr:[{name: Ram}, {name:Shyam}]
        }
        */
      for (let i = 0; i < clone[key].length; i++) {
        if (typeof clone[key][i] === "object")
          clone[key][i] = deepCopy(clone[key][i]);
      }
    } else if (typeof obj[key] === "object") {
      clone[key] = deepCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  });

  return clone;
};

newPerson = deepCopy(person);

// 3. Easiest : JSON.stringify() -> JSON.parse()
newPerson = JSON.parse(JSON.stringify(person));

console.log("Person: ", person);
console.log("New Person: ", newPerson);
