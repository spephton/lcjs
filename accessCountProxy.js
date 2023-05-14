const alice = new Proxy({name: "Alice", age: 25}, {
    get: (target, key) => {
        let prefix = "accessCount_";
        countKey = prefix + key;

        if (!target[countKey]) {
            target[countKey] = 1;
        }
        else {
            target[countKey] += 1;
        }

        if (key.slice(0, prefix.length) === prefix) {
            return target[key];
        }
        else {
            return target[key];
        }
    }
});

console.log(alice.age);
console.log(alice.accessCount_age);
console.log(alice.age);
console.log(alice.accessCount_age);
