// Promises are not async
/*
It will run all the sync code inside it.
If everything inside it is sync, then it will directly resolve()
and return the result
If there is some async work inside the promise, then it returns a 
pending promise.
And then whenever the async work is over, it will resolve or reject it.

then() and catch() are Synchronous
resolve() and reject() for a promise run only once.

Important Points about Promises
Promise => assurance of a work that could be completed in future.
future value inside that promise is determined by the function that returns the promise
promise-> initial-> state-> pending, value -> undefined 
    finally: state : 
    resolved -> value: value passed while calling the resolve function state : 
    rejected-> value:error
to consume a promise we have two Synchronous function then and catch. They are used to register cb function on that promise.
cb functions passed inside then and catch are async.
promise can only be rejected or resolved once in a lifetime.
every then and catch also returns a promise
the promise returned from that then depends upon the cb function inside that then
final state of promise returned from then/catch depends upon value returned from there cb =>
     if cb returns then your promise will resolve into 
        val=>val 
        nothing=> undefined 
        promise=> promise 
        reject -> error
*/

//Promise with only sync work
function promisifiedFn() {
  return new Promise(function (resolve, reject) {
    // only sync work, return 10 directly
    console.log("inside promise");

    resolve(10);

    // statements after resolve also run.
    console.log("Hello");
  });
}

let promiseObject = promisifiedFn();
console.log("pObject ", promiseObject);

// Promise with Async work
function promisifiedFn() {
  return new Promise(function (resolve, reject) {
    // setTimeout is async so it return pending promise
    // and then when setTimeout runs then it returns 10
    console.log("inside promise");

    setTimeout(function () {
      resolve(10);
    }, 0);

    console.log("Hello");
  });
}

let promiseObject = promisifiedFn();
console.log("pObject ", promiseObject);

// After 1 ms the promise would have resolved, so promiseObject would have the result i.e. 10
setTimeout(function () {
  console.log("pObject ", promiseObject);
}, 1);


// then and catch are sync
// but this chain as a whole is async
// So, it will print -> before -> after -> data -> later inside first then
console.log("before");
promiseObject
    .then(
        function (data) {
            console.log("data", data);
            return "inside first then";
        }).then(function (thenkadata) {
            console.log("later", thenkadata)
        })
console.log("after");

// async await works exactly like then() and catch
// so it runs the code synchronously, until await is encountered
// everything in that function after await will go into the API
// And the JS Stack will continue with the rest of the code
// The whole function made async does not go into the API, only the lines after the await are async
console.log("before");
async function fn() {
    // syntax sugar for then
    try {
        console.log("Inside fn");
        // everything in this function after the await goes into the API
        let data = await promiseObject;
        console.log("data", data);
        
    } catch (err) {
        console.log(err);
    }
}
fn();
console.log("after");


// Output Based Questions================================================================
// Q1====================================================
/*
Then can be written in two ways:
1. then(successCallback) which is the normal then
2. then(successCallback, faillureCallback)
successCallback runs if promise is fulfilled
failureCallback runs if promise is rejected
*/
let p = new Promise(function (resolve, reject) {
  reject(new Error("some error"));
  setTimeout(function () {
    reject(new Error("some error"));
  }, 1000)
  reject(new Error("some error"));
});
// p.then(null,failureCallback) is equivalent to: p.catch(failureCallback);
p.then(null, function (err) { // so this acts the same way as catch()
  console.log(1);
  console.log(err);
})
// fcb
.catch(function (err) { // because then(null, fcb) acts as catch, so this statement is not reached
  console.log(2);
  console.log(err);
});
// p.then(scb, fcb);
// p.then(scb)
p.then(scb);
p.catch(fcb)

// Q2=============================================================
/*
Promises go into the microtask queue which has higher priority than the waiting queue in which the callbacks go.
So, Promises will be resolved before the callbacks
*/
console.log(1);
setTimeout(function () {
    console.log(3);
});
console.log(4);
setTimeout(function () {
    console.log(2);
});
// t-> resolve

// microtask queue
Promise.resolve().then(function () {
    console.log(5);
});
console.log(6);

// Q3========================================================================
function resolveAfterNSeconds(n, x) {
  return new Promise(resolve => {
      console.log("Before");
      setTimeout(() => {
          resolve(x);
      }, n);
      console.log("After");
  });
}
//   t-> 0
(function () {
  let a = resolveAfterNSeconds(1000, 1)
  console.log("a", a);// on which second a will be printed PP-> 0th second
  a.then(async function (x) {
      console.log("x", x) // on which second x will be printed -> 1 1st second
      let y = await resolveAfterNSeconds(2000, 2)
      console.log("y", y) // on which second  y will be printed -> 2 3rd second 
      let z = await resolveAfterNSeconds(1000, 3)
      console.log("z", z) // on which second z will be printed -> 3 4th second
      let p = resolveAfterNSeconds(2000, 4)
      console.log("p", p) // on which second  p will be printed -> Pending promise 4th second
      let q = resolveAfterNSeconds(1000, 5); //-> Pending promise 4th second
      console.log(x + y + z + await p + await q); //output on which second  15  6thsecond
  })
})()