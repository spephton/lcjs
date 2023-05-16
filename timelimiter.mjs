var timeLimit = function(fn, t) {
	return async function(...args) {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject("Time Limit Exceeded")
			}, t);
			fn(...args)
				.then(resolve)
				.catch(reject)
				.finally(() => {clearTimeout(timeout)});
		});
	}
};

// example input function:
const square100 = async () => {
	await new Promise((res => setTimeout(res, 100)));
}

const limSq100 = timeLimit(square100, 50);

try {
	await limSq100().catch(console.log("hi"));
}
catch (e) {
	console.log(e);
}
