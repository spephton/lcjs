var TimeLimitedCache = function() {
    this.data = new Map();    
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    let existingItem = false;
    const storedValue = this.data.get(key);

    if (storedValue) {
        existingItem = true;
        // revoke the timeout (whether or not it has longer to live than the
        // new entry)
        clearTimeout(storedValue.expiry);
    }
    
    const expiry = setTimeout(() => {
        this.data.delete(key);
    }, duration);
    
    this.data.set(key, {value: value, expiry: expiry});
    return existingItem;
};

TimeLimitedCache.prototype.get = function(key) {
    const existingItem = this.data.get(key);
    return (existingItem) ? existingItem.value : -1;
};

TimeLimitedCache.prototype.count = function() {
    return this.data.size;
};

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */

const myCache = new TimeLimitedCache();

console.log("key exists: " + myCache.set(1, 20, 20)); // key, value, duration
console.log(myCache.get(1));
console.log(myCache.get(2)); // -1
console.log(myCache.set(3, 5, 50)); // false
console.log(myCache.set(1, 21, 60)); // true, overwrites timeout

console.log("Waiting 40 ms");
await new Promise((res) => setTimeout(res, 40));
// both keys should still be warm after 40ms:
console.log(myCache.count()) // 2
console.log("Waiting 40 ms");
await new Promise((res) => setTimeout(res, 40));
console.log(myCache.count()) // 0
console.log(myCache.get(1)); // -1
console.log(myCache.get(3)); // -1