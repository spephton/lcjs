var findDifference = function(nums1, nums2) {
    set1 = new Set(nums1)
    set2 = new Set(nums2)


    set2.forEach(function(x) {
        if (set1.has(x)) {
            set1.delete(x);
            set2.delete(x);
        }
    })

    return [Array.from(set1), Array.from(set2)];
};
