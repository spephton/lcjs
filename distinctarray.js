a = [1, 3, 4, 5];
b = [5, 2, 3, 2]


var findDifference = function(nums1, nums2) {
    let distinctIn1 = [];
    let distinctIn2 = [];

    nums1.sort();
    nums2.sort();

    const min = (a, b) => {a < b ? a : b};
    const len1 = nums1.length;
    const len2 = nums2.length;


    for (i = 0; i < len1; i++) {
        if (distinctIn1.length === 0 ||
                distinctIn1.slice(-1) !== nums1[i]) {
            distinctIn1.push(nums1[i]);
        }
    }

    for (i = 0; i < len2; i++) {
        if (distinctIn2.length === 0 ||
                distinctIn2.slice(-1) !== nums2[i]) {
            distinctIn2.push(nums2[i]);
        }
    }

    i = 0;
    j = 0;

    while (i < distinctIn1.length || j < distinctIn2.length){
        if (distinctIn1[i] === distinctIn2[j]) {
            distinctIn1.splice(i, 1);
            distinctIn2.splice(j, 1);
            // don't increment, we shortened the arrays
        }
        else if (distinctIn1[i] > distinctIn2[j]) {
            j += 1;
        }
        else {
            i += 1;
        }
    }

    return [distinctIn1, distinctIn2];
};

console.log(findDifference(a, b));
