// positive integer millis, async function that sleeps for millis seconds


async function sleep(millis) {
	return new Promise(r => setTimeout(r, 2000));
}

console.log("hi");
await sleep(2000);
console.log("bye");
