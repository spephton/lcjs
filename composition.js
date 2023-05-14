
var compose = function(functions) {
	return function(x) {
        let composition = x;
        for (i = functions.length -1; i >= 0; i--) {
            composition = functions[i](composition);
            // If you wanted to preserve the behaviour of a method
            // you could use .call(this, composition)
            // The "this" context would need to be passed in as a parameter.
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