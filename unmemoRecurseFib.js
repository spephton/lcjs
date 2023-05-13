const n = process.argv[2];

// don't do this. i got bored waiting for n = 100; memoFib did it in a blink
function fib(n) {
	if (n < 1) {return 0}
	if (n === 1 || n === 2) {
		return 1;
	}
	return fib(n-1) + fib(n-2);
}

console.log(fib(n));
