let n = process.argv[2];

let memo = new Array();

function fib(n) {
	if (n < 1) {return 0};
	// base case
	if (n === 1 || n === 2) {
		console.log('base');
		return 1;
	}
	// already calculated
	if (memo[n] !== undefined) {
		console.log(`memoized: ${memo[n]}`);
		return memo[n];
	}
	// otherwise calculate
	
	memo[n] = fib(n - 1) + fib(n - 2);
	return memo[n];
}
console.log(fib(n));
