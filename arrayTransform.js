let cheatMap = function(arr, fn) {
    return arr.map(fn);
}

let map = function(arr, fn) {
    let newArray = []; // can preallocate mem: new Array(arr.length)
    // or use a typed array new Int32Array(arr.length) 
    // (like c array, very fast)
    for (i = 0; i < arr.length; i++) {
        newArray.push(fn(arr[i]));
    }
    return newArray;
}

let inPlaceMap = function(arr, fn) {
    for (i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i]);
    }
    return arr; // it might be faster if we avoid the return
                // I don't know if this is a reference
                // it probably is dw
}


function addOne(x) {
    return x + 1;
}

let arr = [1, 2, 3, 4, 5];

let mapped = map(arr, addOne);

console.log(mapped);

mapped = inPlaceMap(arr, addOne);
mapped = inPlaceMap(arr, addOne);

console.log(mapped);
