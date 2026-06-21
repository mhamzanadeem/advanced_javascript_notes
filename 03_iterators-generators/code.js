// ===============================
// ITERATORS & GENERATORS
// ===============================

// -------------------------------
// ITERATOR PROTOCOL
// -------------------------------

const manualIterator = {
    data: [10, 20, 30],
    index: 0,

    next() {
        if (this.index < this.data.length) {
            return {
                value: this.data[this.index++],
                done: false
            };
        }

        return { done: true };
    }
};

console.log(manualIterator.next());
console.log(manualIterator.next());
console.log(manualIterator.next());
console.log(manualIterator.next());

// -------------------------------
// GENERATORS (AUTO ITERATORS)
// -------------------------------

function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numbers();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// -------------------------------
// Generator with loop
// -------------------------------

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const n of range(1, 5)) {
    console.log(n);
}

// -------------------------------
// Infinite generator
// -------------------------------

function* infiniteIds() {
    let id = 1;

    while (true) {
        yield id++;
    }
}

// -------------------------------
// INTERVIEW CHECKPOINT
// -------------------------------
/*
Generator = function that pauses execution using yield
Iterator = object with next()
*/