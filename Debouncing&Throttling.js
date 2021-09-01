let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");

// https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
// Throttling
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last < delay) return;

    fn(...args);
    last = now;
  };
}

function doSomething1() {
  console.log("Throttled Function Called.");
}

// You cannot call this event until 2sec have passed after it was last called
btn1.addEventListener("click", throttle(doSomething1, 2000));

// Debouncing
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
      console.log("Timer Cleared");
    }

    timerId = setTimeout(function () {
      fn(...args);
    }, delay);
  };
}

function doSomething2() {
    console.log("Debounced Function Called.");
  }

// Function will be called after 2sec, and if the event happens again in those 2 sec, then the timer is reset back to 2sec
btn2.addEventListener("click", debounce(doSomething2, 2000));
