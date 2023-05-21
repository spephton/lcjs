const timeoutFunction = (fn, t) => {
    let currentTimeout;
    return async (...args) => { return new Promise((res) => {
        currentTimeout = setTimeout(() => {
            res(fn(...args));
        }, t)});
    }
}

Array.prototype.max = function() {
    if (this.length === 0) return undefined;
    let max = this[0]; // account for arb large -ive vals
    let i;
    for (i = 1; i < this.length; i++) {
        if (this[i] > max) max = this[i];
    }
    return max;
}
let exampleArr = [1, 2, 3, 45, 4, 5]
console.log(exampleArr.max())



let myAdd = (a, b) => {
    let arr = new Array(1000000);
    let i;
    for (i = 0; i < arr.length; i++) {
        arr[i] = a + (i * b);
    }
    return arr.reduce((acc, x) => {
        return acc + x;
    });
}
let timeoutMilliSec = 2;
let timeAdd = timeoutFunction(myAdd, timeoutMilliSec);

const nTrials = 50;
let totalTime = new Array(nTrials);
let startTime = new Array(nTrials);

for (let i = 0; i < nTrials; i++) {
    startTime[i] = new Date();
    let process = (result) => {
        let after = new Date();
        totalTime[i] = (after - startTime[i]);
    }
    timeAdd(1, 3).then(process);
}

const sleep = async (t) => new Promise((res) => setTimeout(res, t));
await sleep(500); // wait for all to finish?
console.log(totalTime.slice(-1)[0]) //this shouldn't be undef
// yeah this is sketch but w/e

console.log(totalTime.slice(0, 10));
let etime = totalTime.map((x) => x - timeoutMilliSec);
let maxEtime = etime.max();

function avg(array) {
    let i;
    let acc = 0;
    for (i = 0; i < array.length; i++) {
        acc += array[i];
    }
    return acc / array.length;
}

let avgEtime = avg(etime);

console.log(`Max exec time: ${maxEtime}, mean exec time = ${avgEtime}`);

console.log(startTime);