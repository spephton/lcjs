const piles = [[1, 100, 3], [7, 8, 9]];
const k = 2;


// not it but nice try:
let coinScore = (piles) => {
	const scores = [];

	for (i = 0; i < piles.length; i++) { // each pile
		const arr = new Array();
		let acc = 0;
		let score;
		for (let k = 0; k < piles[i].length; k++) {
			acc += piles[i][k];
			score = acc / (k + 1); // return per k spent
			arr.push(score);
		}
		scores.push(arr);
	}
	return scores;
}

console.log(coinScore(piles))




			
