
function solution(inputString, mapping) {
	let result = "";
	
	let departed = false;
	let k = 0;
	while (k !== 0 || departed === false) {
		departed = true;
		result += inputString[k];
		k = mapping[k];
	}
	return result;
}
let s = "cdeo";
let a = [3, 2, 0, 1];

//expect "code"

console.log(solution(s, a));

s = "cdeenetpi";
a = [5,2,0,1,6,4,8,3,7];

console.log(solution(s, a));

s = "bytdag";
a = [4, 3, 0, 1, 2, 5];

console.log(solution(s, a));
