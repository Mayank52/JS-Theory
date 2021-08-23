// Recursive function to flatten an object
// serialize the object
let obj = {
  KeyA: 1,
  KeyB: {
    c: 2,
    d: 3,
    e: {
      f: 7,
      "": 2,
    },
  },
};

// Answer should be
let final = {
  "KeyA": 1,
  "KeyB.c": 2,
  "KeyB.d": 3,
  "KeyB.e.f": 7,
  "KeyB.e": 2,
};

function flatten(obj) {
  let res = {};

  for (let i in obj) {
    // if key i is an object itself, Eg: KeyB, then flatten it as well
    if (typeof obj[i] === "object") {
      let smallObj = flatten(obj[i]);

      for (let j in smallObj) {
        res[i + "." + j] = smallObj[j];
      }
    }
    // if key is not an object, Eg: KeyA, then add it to the ans directly
    else {
      res[i] = obj[i];
    }
  }

  return res;
}

let ans = flatten(obj);
console.log("Original Object: ", obj);
console.log("Flattened Object: ", ans);
