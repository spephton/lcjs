import fs from 'fs/promises';

let object = JSON.parse(await fs.readFile('bugbjk.json', {encoding: 'utf-8'}));
console.log(object);
let object2 = JSON.parse(await fs.readFile('bugbjk2.json', {encoding: 'utf-8'}));
console.log(object2);

const isObject = (x) => (x !== null && typeof(x) === "object");

let areDeeplyEqual = function(o1, o2) {
	let equals;
	if (o1 === null) {
		return (o2 === null);
	}
	// not an object or array
	if (typeof(o1) !== "object") {
		return (o1 === o2);
	}
	if (o1.constructor !== o2.constructor) return false;
	if (Object.keys(o1).length !== Object.keys(o2).length) return false;
	for (const [key, value] of Object.entries(o1)) {
		//objects (and arrays!)
		if (isObject(value)) {
			if (!isObject(o2[key])) return false; // check also object
			equals = areDeeplyEqual(o1[key], o2[key]); // compare props
			if (!equals) return false;
		}
		else {
			if (value !== o2[key]) return false;
		}
	}
	return true;
}


let a = { prop1: "boobs" }
console.log(a.prop1);
console.log(a.nerd);

console.log(true === areDeeplyEqual(object, object));
console.log(false === areDeeplyEqual(object, object2));
console.log(true === areDeeplyEqual(true, true));
console.log(false === areDeeplyEqual(true, false));
console.log(false === areDeeplyEqual({0: 1}, [1]));
