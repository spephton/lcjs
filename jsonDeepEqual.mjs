import fs from 'fs/promises';

let object = JSON.parse(await fs.readFile('bugbjk.json', {encoding: 'utf-8'}));
console.log(object);
let object2 = JSON.parse(await fs.readFile('bugbjk2.json', {encoding: 'utf-8'}));
console.log(object2);

const isObject = (x) => (x !== null && typeof(x) === "object");

let compareTopLevelRec = function(o1, o2, seenSet, path) {
	let equals = true;
	if (o1 === null) {
		if (o2 === null) {
			return true;
		}
		else {
			return false;
		}
	}
	if (o1 !== o2 && (!isObject(o1))) return false;
	if (o1.constructor !== o2.constructor) return false;
	if (Object.keys(o1).length !== Object.keys(o2).length) return false;
	for (const [key, value] of Object.entries(o1)) {
		let currentPath = [...path, key];
		seenSet.add(currentPath);

		//objects (and arrays!)
		if (isObject(value)) {
			if (!isObject(o2[key])) return false; // check also object
			equals = compareTopLevelRec(o1[key], o2[key], seenSet, currentPath); // compare props
			if (!equals) return false;
		}
		else {
			if (value !== o2[key]) return false;
		}
	}
	return true;
}

let areDeeplyEqual = function(o1, o2) {
	let equal = true;
	let seenKeys = new Set();
	equal = compareTopLevelRec(o1, o2, seenKeys, []);
	return equal;
}

let a = { prop1: "boobs" }
console.log(a.prop1);
console.log(a.nerd);

console.log(true === areDeeplyEqual(object, object));
console.log(false === areDeeplyEqual(object, object2));
console.log(true === areDeeplyEqual(true, true));
console.log(false === areDeeplyEqual(true, false));
console.log(false === areDeeplyEqual({0: 1}, [1]));
