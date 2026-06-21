
---

# 3. Generators and Iterators

---

# Iterators

---

## What is an Iterator?

An iterator is an object with a `next()` method.

```js
const iterator = {
    next() {
        return {
            value: 1,
            done: false
        };
    }
};
```

---

## Manual Iterator

```js
function createIterator(arr) {
    let index = 0;

    return {
        next() {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                };
            }

            return {
                done: true
            };
        }
    };
}

const it = createIterator([10,20,30]);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

---

## Iterator Result

```js
{
  value: 10,
  done: false
}
```

---

# Generators

---

## What is a Generator?

A generator automatically creates an iterator.

Syntax:

```js
function* generatorName() {}
```

---

## Basic Generator

```js
function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numbers();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

Output:

```js
{ value:1, done:false }
{ value:2, done:false }
{ value:3, done:false }
{ value:undefined, done:true }
```

---

## How yield Works

```js
function* demo() {
    console.log("A");

    yield 1;

    console.log("B");

    yield 2;

    console.log("C");
}
```

Execution pauses at each yield.

---

## Looping Generator

```js
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num);
}
```

Output:

```text
1
2
3
4
5
```

---

## Infinite Generator

```js
function* ids() {
    let id = 1;

    while (true) {
        yield id++;
    }
}

const gen = ids();

console.log(gen.next().value);
console.log(gen.next().value);
```

Output:

```text
1
2
```

---

## Passing Values Into Generator

```js
function* greet() {
    const name = yield;

    console.log(`Hello ${name}`);
}

const gen = greet();

gen.next();

gen.next("Hamza");
```

---

## Why Generators?

Useful for:

```text
1. Lazy loading
2. Infinite sequences
3. Data streaming
4. Custom iteration
5. Async workflows (historically)
```