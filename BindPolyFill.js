// Bind PolyFill
// https://dev.to/uddeshjain/creating-your-own-bind-polyfill-of-bind-433j

Function.prototype.myBind = function (currentThis) {
  let currentFn = this;

  return function fn() {
    console.log("Hello");
    currentFn.apply(currentThis);
  };
};

let abc = {
  name: "jasbir",
};
let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("outside", this.name);
    function inner() {
      console.log("inside inner", this.name);
    }
    let boundFn = inner.myBind(abc);
    return boundFn;
  },
};

let boundFn = obj.sayHi();
console.log("Before Call")
boundFn("A", "123", "ad");
