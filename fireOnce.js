const once = function(fn) {
    let called = false;
    return (...args) => {
        if (!called) {
            called = true;
            return fn(...args);
        }
        else {
            return undefined;
        }
    }
}

function addOne(x) {
    return x + 1;
}

const onlyIncOnce = once(addOne);

let x = 5;
x = onlyIncOnce(x);
console.log(x);
x = onlyIncOnce(x);
console.log(x);