import fs from 'fs/promises';

let jsonStringify = function(object) {
	let thisObject = '';
	if (typeof(object) === 'string') {
		return '"' + String(object) + '"';
	}
	if (object == null || typeof(object) === 'number' || typeof(object) === 'boolean') {
		return String(object);
	}
	else if (typeof(object) === 'object') {
		if (Array.isArray(object)) {
			thisObject += '[';
			for (let i = 0; i < object.length; i++) {
				thisObject += jsonStringify(object[i]); // not acct for sparse arrays
				thisObject += ',';
			}
			if (object.length === 0) {
				thisObject += ']';
			}
			else {
				// drop trailing comma
				thisObject = thisObject.slice(0, -1) + ']';
			}
			return thisObject;
		}
		else if (object.constructor === Object) {
			thisObject = '{';
			let objLen = 0;
			for (let [key, value] of Object.entries(object)) {
				objLen++;
				thisObject += '"' + key + '":';
				thisObject += jsonStringify(value);
				thisObject += ',';
			}
			if (objLen === 0) {
				// drop trailing comma
				thisObject += '}';
			}
			else {
				thisObject = thisObject.slice(0, -1) + '}';
			}
			return thisObject;
		}
		else {
			console.log('Missed an Object');
			console.log(object);
		}
	}
	else {
		console.log('Missed a case');
	}
}


let object = JSON.parse(await fs.readFile('bugbjk.json', {encoding: 'utf-8'}));

console.log(JSON.stringify(object));
console.log(jsonStringify(object));
