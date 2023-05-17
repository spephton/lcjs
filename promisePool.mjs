
const promisePool = async function(functions, n) {
    return new Promise((res) => {
        let working = 0;
        let resolved = 0;

        let getNextFunction = () => {
            resolved += 1;
            if (resolved >= functions.length) {
                res("hallelujah");
            }
            else if (working < functions.length) {
                working++;
                functions[working - 1]().then(getNextFunction)
            }
        }

        for (working = 0; 
            working < n && working < functions.length;
            working++) {
            console.log(working);
            functions[working]().then(getNextFunction);
        }

    });
}

const sleep = (t) => new Promise(res => setTimeout(res, t));
console.log("starting");
promisePool([() => sleep(2000), () => sleep(4000), () => sleep(1000),], 2)
    .then(console.log)