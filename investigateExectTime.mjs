import fs from 'fs/promises';
import assert from 'assert';

const timeoutFunction = (fn, t) => {
    return async (...args) => { return new Promise((res) => {
        let currentTimeout = setTimeout(() => {
            res(fn(...args));
        }, t)});
    }
}

const sleep = async (t) => new Promise((res) => setTimeout(res, t));

Array.prototype.max = function() {
    if (this.length === 0) return undefined;
    let max = this[0]; // account for arb large -ive vals
    let i;
    for (i = 1; i < this.length; i++) {
        if (this[i] > max) max = this[i];
    }
    return max;
}

function avg(array) {
    let i;
    let acc = 0;
    for (i = 0; i < array.length; i++) {
        acc += array[i];
    }
    return acc / array.length;
}


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

const nTrials = 1000;
let startTime = new Date();
let totalTime;
let completedLoops = 0;

for (let i = 0; i < nTrials; i++) {
    let process = (result) => {
        completedLoops++;
        if (i === nTrials - 1) {
            const finishTime = new Date();
            totalTime = (finishTime - startTime - timeoutMilliSec)
            console.log(totalTime);
        }
    }
    // I've verified that all of these will resolve in order,
    // so stopping the timer when the last promise resolves is a good 
    // benchmark in this case... using this code and node 19 at least.
    timeAdd(1, 3).then(process);
}

await sleep(2); // hack: this goes on to the queue for the event loop after
// everything else, so it waits for everything else to resolve first.
// therefore the argument to sleep() can be arbitrily small even though
// you really need to wait 3s to be sure you're good on my machine with the 
// code as it is at time of writing this comment.
console.log(`Total execution time for ${nTrials} loops is ${totalTime}.`)
console.log(`This corresponds to an average exec time per resolution of `
    + totalTime/nTrials + '.');
console.log(completedLoops);

await fs.appendFile('runtimes.txt',  `${totalTime/nTrials}\n`);

let fh = await fs.open('runtimes.txt');
let fileContents = await fh.readFile('utf-8');
let avgTimesList = fileContents.split('\n').map(Number);
assert(avgTimesList.pop() === 0); // trailing newline results in extra 0
console.log(avgTimesList);
let total = avgTimesList.reduce((acc, x) => acc + x, 0);
console.log(total / avgTimesList.length);
