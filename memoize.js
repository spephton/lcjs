function sum(a, b) {
    return a+b;
}

function fib(n) {
    let prev = 1;
    let prevPrev = 1;
    let current;

    if (n <= 2) {
        return 1;
    }

    for (i = 2; i < n; i++) {
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
    }
    return current;
}

for (i = 0; i < 20; i++) {
    console.log(fib(i));
    // sick it works even though i am zonged
    // so slepy
}

function factorial(n) {
    if (n <= 1) {
        return 1
    }
    else {
        return factorial(n - 1) * n;
    }
}

for (i = 0; i < 7; i++) {
    console.log(factorial(i));
}

function memoize(fn) {
    memo = new Map();
    return function(...args) {
        console.log(memo);
        if (memo.has(args.toString())) {
            console.log("o memsahib, bart, rabbi has memo");
            return memo.get(args.toString());
        }
        else {
            result = fn(...args);
            memo.set(args.toString(), result);
            return result;
        }
    }
}

mFib = memoize(fib)

console.log(mFib(5));

console.log(mFib(5));

console.log("mememoising add");

mAdd = memoize(sum);

console.log(mAdd(3, 2));

console.log(mAdd(3, 2));