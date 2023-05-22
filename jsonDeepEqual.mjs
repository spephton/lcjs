import fs from 'fs/promises';

let object = JSON.parse(await fs.readFile('bugbjk.json', {encoding: 'utf-8'}));
console.log(object);
let object2 = JSON.parse(await fs.readFile('bugbjk2.json', {encoding: 'utf-8'}));
console.log(object2);


let areDeeplyEqual = function(o1, o2) {
	let equals;
	if (o1 === o2) return true;
	if (o1 === null || o1 === undefined || o2 === null || o2 === undefined) return false;
	if (typeof(o1) !== "object") return false; // if it's not equal and not an object/array it's unequal

	
	if (o1.constructor === Array) {
		if (o2.constructor !== Array || o1.length !== o2.length) return false;
		for (let i = 0; i < o1.length; i++) {
			if (o1[i] === o2[i]) continue;
			equals = areDeeplyEqual(o1[i], o2[i]);
			if (!equals) return false;
		}
	}
	else if (o1.constructor === Object) {
		if (o2.constructor !== Object) return false;
		if (Object.keys(o1).length !== Object.keys(o2).length) return false;
		
		for (const [key, value] of Object.entries(o1)) {
			if (value === o2[key]) continue;
			equals = areDeeplyEqual(value, o2[key]); // compare props
			if (!equals) return false;
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
