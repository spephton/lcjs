
var compose = function(functions) {
	return function(x) {
        let composition = x;
        for (i = functions.length -1; i >= 0; i--) {
            composition = functions[i](composition);
        }
        return composition;
    }
};

let addOne = (x) => {
    return x + 1;
}

let timesTwo = (x) => {
    return x * 2;
}

let plusThree = (x) => {
    return x + 3;
}

const arr = [addOne, timesTwo, plusThree];

let composed = compose(arr);
console.log(composed(2))