let reduce = function(nums, fn, init) {
    let val = init;

    for (i = 0; i < nums.length; i++) {
        val = fn(val, nums[i]);
    }

    return val;
}

const sum = (acc, x) => {
    return x + acc;
}

let arr = [1, 2, 3, 4, 5];

console.log(reduce(arr, sum, 0));


// array indexing is a sick concept I want to practice implementing that
const groceries = [
    { id: 171, name: "ham" },
    { id: 12, name: "cheese" }, 
    { id: 535, name: "croissant" },
]

const indexedGroceries = groceries.reduce((acc, val) => {
    acc[val.id] = val;
    return acc; // using spread syntax here would make perf suck
}, {});

console.log(indexedGroceries);