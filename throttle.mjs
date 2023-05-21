const returningThrottle = function(fn, t) {
    let args;
    let curPromise;
    let promiseActive;
    let curArgs;
    let shouldCall;
    return function(...args) {
        curArgs = [...args];
        if (!promiseActive) {
            shouldCall = false;
            promiseActive = true;
            curPromise = new Promise((res) => {
                setTimeout(() => {
                    promiseActive = false;

                    res(fn(...curArgs));
                }, t);
            });
            return fn(...args);
        }
        return curPromise;
    }
}


let sleep = async (t) => new Promise((res) => setTimeout(res, t));

// let's do this again but simpler
// don't bother trying to resolve a promise until you have the pattern down 
const throttle = (fn, t) => {
    let activeTimeout = false;
    let shouldResolve = false;
    let currentArgs;
    return (...args) => {
        currentArgs = [...args];

        function makeNewTimeout() {
            activeTimeout = true;
            return setTimeout(() => {
                if (shouldResolve) {
                    shouldResolve = false;
                    makeNewTimeout();
                    fn(...currentArgs);
                }
                else {
                    // expire harmlessly
                    activeTimeout = false;
                }
            }, t);
        }

        if (!activeTimeout) {
            makeNewTimeout();
            return fn(...args);
        }
        else {
            // we've already updated args
            // make sure function resolves when timeout expires
            shouldResolve = true
        }
    }
}

// This is another way to do it, avoiding recursive calls. You could also use
// setInterval
var remainingTimeThrottle = function(fn, t) {
    let timeoutId = null, restTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        const delay = Math.max(0, restTime - currentTime);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { 
            fn(...args);
            restTime = Date.now() + t;
        }, delay);
    }
};

function syncSleep(t) {
    const now = Date.now();
    while (Date.now() < now + t) {}
    return;
}

const add = (a, b) => console.log(a + b);
const thradd = throttle(add, 1000);

thradd(1, 2);
await sleep(1);
thradd(1, 1);

thradd(7, 6);
thradd(1, 5);
await sleep(700);
thradd(1, 3);
await sleep (20);
thradd(12, 40);
await sleep(400);
thradd(60, 9);
await sleep(1);
thradd(5, 5);
await sleep(1);
thradd(400, 20);
