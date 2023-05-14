let filter = function(arr, fn) {
    let filteredArr = new Array();
    for (i in arr) { // this respects sparse arrays,
                     // (i = 0; i < arr.length; i++) is faster
        if (fn(arr[i], Number(i))) {
            filteredArr.push(arr[i])
        }
    }
    return filteredArr;
}

let isPositive = (num) => {
    return (num > 0);
}

let arr = [1, 2, -3, 4, -5, 6, 7, 9, -420];

const filtered = filter(arr, isPositive);

console.log(filtered);