const throttle = function(fn, t) {
    let args;
    let curPromise;
    let promiseActive;
    let curArgs;
    return function(...args) {
        curArgs = [...args];
        if (!promiseActive) {
            promiseActive = true;
            curPromise = new Promise((res) => {
                setTimeout(() => {
                    promiseActive = false;
                    res(fn(...curArgs));
                }, t);
            });
        }
        return curPromise;
    }
}

const add = (a, b) => a + b;
const thradd = throttle(add, 50);

let timeout = thradd(1, 2);
timeout = thradd(1, 1);

console.log(await timeout);

let sleep = async (t) => new Promise((res) => setTimeout(res, t));