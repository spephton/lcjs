import fs from 'fs/promises';

let object = JSON.parse(await fs.readFile('bugbjk.json', {encoding: 'utf-8'}));
console.log(object);
let object2 = JSON.parse(await fs.readFile('bugbjk2.json', {encoding: 'utf-8'}));
console.log(object2);