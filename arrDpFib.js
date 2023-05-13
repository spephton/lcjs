const n = process.argv[2];

function fib(n) {
	dp = [];
	
	//base case
	dp[1] = 1;
	dp[2] = 1;
	
	for (i = 3; i <= n; i++) {
		dp[i] = dp[i-1] + dp[i-2];
	}
	console.log(dp);
	return dp[n];
}

console.log(fib(n));
	
