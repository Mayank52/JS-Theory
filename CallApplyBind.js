// this:
/* 
this is an entity that is defined inside a function -> that is defined when a function is called and depends upon how it is called
this inside a function is decided during runtime
*/

let abc = {
  name: "jasbir",
};
let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("outside", this);
    // 1.  provide a this to function
    function special(a, b) {
      console.log(a, b);
      console.log("special", this);
    }
    special();
    special("hello", "hi");
    console.log(this.name, "say's Hi");
  },
};
// method call -> this send
obj.sayHi();

// call():
/*
The call() method calls a function with a given this value and arguments provided individually.
Syntax:
call()
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2)
call(thisArg, arg1, ... , argN)

*/
let abc = {
  name: "Mayank",
};
let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("outside", this);
    // 1.  provide a this to function
    function special(a, b) {
      console.log(a, b);
      console.log("special", this);
    }
    // i am calling special such that it's this is outer obj
    special.call(this);
    special();
    special.call(this, "hello", "hi");
    special.call(abc, "hello", "hi");
    console.log(this.name, "say's Hi");
  },
};
// method call -> this send
obj.sayHi();

obj.sayHi.call(abc);
function sayHi() {
  console.log("this", this);
  function sayHiInternal() {
    console.log("internal", this);
  }
  sayHiInternal();
}

// Arrow Functions take this from lexical scope
/*
Jis bhi function m ho
Usse just bahar wala function this m hoga
*/
let cap = {
  name: "Steve",
  sayHi: () => {
    const special = () => {
      console.log(this);
    };
    special();
  },
};

cap.sayHi();

// apply()
/*
The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).
Syntax:
apply(thisArg)
apply(thisArg, [arg1, arg2 ..... argn]) 

*/

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
let abc = {
  name: "jasbir",
};
let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("outside", this);
    // 1.  provide a this to function
    function special(...args) {
      console.log(a, b);
      console.log("special", this);
    }
    // i am calling special such that it's this is outer obj
    // special.call(this);
    // special();
    special.call(this, "hello", "hi");
    special.apply(abc, arr);
    // special.call(this, "hello", "hi");
    // console.log(this.name, "say's Hi");
  },
};
obj.sayHi();

// bind()
/*
The bind() method creates a new function that, when called, has its this keyword set to the provided value, 
with a given sequence of arguments preceding any provided when the new function is called.
Syntax:
bind(thisArg)
bind(thisArg, arg1)
bind(thisArg, arg1, arg2)
bind(thisArg, arg1, ... , argN)
*/

// bind -> function -> copy predefined this
let abc = {
  name: "jasbir",
};
let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("outside", this);
    // 1.  provide a this to function
    function special() {
      // console.log(a, b)
      console.log("special", this);
    }
    // // i am calling special such that it's this is outer obj
    // special.call(this);
    // special();
    let boundFn1 = special.bind(abc);
    let boundFn2 = special.bind(obj);
    return { boundFn2, boundFn1 };
    //         // special.call(this, "hello", "hi");
    // console.log(this.name, "say's Hi");
  },
};
let { boundFn1, boundFn2 } = obj.sayHi();
boundFn1();
boundFn2();
