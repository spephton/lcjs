var createCounter = function(init) {
    counter = new Object();
    counter.init = init;
    counter.c = init;
    counter.increment = function() {return ++this.c;};
    counter.decrement = function() {return --this.c;};
    counter.reset = function() {this.c = this.init; return this.c;};

    return counter;
};