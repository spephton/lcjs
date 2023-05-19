let debounce = function(fn, t)
{
	let currentTimer;
	return function(...args) {
		if (currentTimer) {
			clearTimeout(currentTimer);
		}
		const helper = () => fn(...args);
		currentTimer = setTimeout(helper, t);
		return currentTimer;
	}
}

const returningDebounce = function(fn, t)
{
	let currentTimeout;
	return async function(...args)
	{
		return new Promise((res, rej) =>
		{
			if (currentTimeout) clearTimeout(currentTimeout);
			const helper = () => {res(fn(...args))};
			currentTimeout = setTimeout(helper, t);
		});
	}
}

let log = returningDebounce(console.log, 50);

let sleep = async (t) => {
	return new Promise((res) => { setTimeout(res, t) });
};

log("hi");
log("hh");
await sleep(40);
log("heh");
await sleep(60);
log("Obama chuckled softly");
await sleep(60);
log("You mean the chaos emeralds?");


const add = (a, b) =>  a + b;
const dbadd = returningDebounce(add, 50);

let results = [];
dbadd(4, 2).then((result) => results.push(result));
// not ever resolving probably makes the above a memory leak
// we could fix if we cared
dbadd(4, 7).then((result) => results.push(result));
console.log(results);
await sleep(60);
console.log(results);
