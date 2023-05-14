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