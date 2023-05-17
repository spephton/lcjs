let a = [1, 2]
let sumThree = (a, b, c) => {
    return a + b + c;
}

console.log(sumThree.length);

// I'm pretty proud about working out how to do this without googling
// AND it's 90+ percentile on speed and mem
const curry = function(fn) {
    let argsArr = new Array();
    return function curried(...args) {
        argsArr.push(...args);
        if (argsArr.length >= fn.length) {
            return fn(...argsArr);
        }
        else {
            return curried;
        }
    }
}

currySum = curry(sumThree);

console.log(currySum(1)(2,3));

partial = currySum(2);
console.log("hi");
console.log(partial);
console.log(partial(3,4));

/*
this is very handy: 

const apiCall = baseUrl => endpoint => params =>
        fetch(`${baseUrl}${endpoint}`, { ...params });

const myApiCall = apiCall("https://my-api.com");
const getUser = myApiCall("/users");
const updateUser = myApiCall("/users/update");

// Usage:
getUser({ userId: 1 });
updateUser({ userId: 1, name: "John Doe" });
*/

// this version uses recursion:
const recursCurry = function(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...nextArgs) => curried(...args, ...nextArgs);
    }
}
