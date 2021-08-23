// Polyfill of setInterval and clearInterval using setTimeout
/*
1. mySetInterval goes into the execution stack
2. It starts the setTimeout(nextCall, delay)
3. nextCall goes into the Web API, and mySetInterval function ends and is removed from the stack
   Now the stack is empty.
4. After 2sec(delay) nextCall comes into queue, then into stack
5. It runs -> it runs fn() -> it starts the next setTimeout() -> it ends and is removed from stack
6. Now again we have fn() in Web API and stack is empty, and 
   This process continues, and fn() gets called recursively every 2 sec (delay time).
*/

// setInterval===============================================
function mySetInterval(fn, delay) {
  function nextCall() {
    // run the callback, then make next call
    fn();

    // 2nd call and all subsequent calls at intervals of delay time, using recursion
    setTimeout(nextCall, delay);
  }

  // 1st call after delay time
  setTimeout(nextCall, delay);
}

function cb() {
  console.log("I will be called after 2 sec");
}
mySetInterval(cb, 2000);

// clearInterval================================================
/*
For clearInterval, we keep a flag.
When we want to clear the interval we set that flag to false
And before making the next call we check that flag
*/
function mySetInterval(fn, delay) {
  let clearObj = {
    shallIRun: true,
  };

  function nextCall() {
    // If shallIRun is set to false, then dont make the next call i.e. stop the setInterval
    if (clearObj.shallIRun === false) return;

    // run the callback, then make next call
    fn();

    // 2nd call and all subsequent calls at intervals of delay time, using recursion
    setTimeout(nextCall, delay);
  }

  // 1st call after delay time
  if (clearObj.shallIRun === true) setTimeout(nextCall, delay);

  // In JS, objects are passed by reference, so we return this clearObj
  // then any changes made to this clearObj will reflect in the original clearObj
  // So, whenever you want to stop the setInterval, just set the shallIRun to false
  return clearObj;
}
function myClearInterval(clearMe) {
  clearMe.shallIRun = false;
}

function cb() {
    console.log("I will be called after 2 sec");
}
// start the recursion for the setInterval
let clearMe = mySetInterval(cb, 2000);


// after the specified amount of time, call myClearInterval
// which will set shallIRun to false, and because of this the fn() will return without making the next call
setTimeout(() => {
  myClearInterval(clearMe);
  console.log("Cleared");
}, 7000); //  stops the setInterval after 7 secs
