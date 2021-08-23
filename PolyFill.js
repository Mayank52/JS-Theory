// Polyfill -> to make our implementation of the pre defined functions
Object.prototype.filter = function (cb) {
  let newObj = {};

  // this -> gives the object this method was called on
  for (let key in this) {
    // console.log(this.hasOwnProperty(key));
    if (this.hasOwnProperty(key) && cb(this[key])) newObj[key] = this[key];
  }

  return newObj;
};

function myFilter(val) {
  console.log(val);
  return val > 3;
}

let obj = {
  a: 1,
  b: 2,
  c: 5,
  d: 6,
  e: 8,
};

console.log(obj);
// call filter method and pass our callback into it
let obj1 = obj.filter(myFilter);
console.log(obj1);
