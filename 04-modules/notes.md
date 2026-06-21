
---

# 4. ES Modules vs CommonJS

---

# CommonJS (Node.js Traditional)

File:

```js
// math.js

function add(a, b) {
    return a + b;
}

module.exports = add;
```

Import:

```js
const add = require("./math");

console.log(add(2,3));
```

---

## Export Multiple

```js
module.exports = {
    add,
    subtract
};
```

Import:

```js
const math = require("./math");

math.add(2,3);
```

---

# ES Modules (Modern JavaScript)

---

## Named Export

```js
// math.js

export function add(a, b) {
    return a + b;
}
```

Import:

```js
import { add } from "./math.js";

console.log(add(2,3));
```

---

## Multiple Named Exports

```js
export function add() {}
export function subtract() {}
```

Import:

```js
import { add, subtract } from "./math.js";
```

---

## Default Export

```js
export default function add(a,b){
    return a+b;
}
```

Import:

```js
import add from "./math.js";
```

---

# CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|----------|----------|-----------|
| Import | require() | import |
| Export | module.exports | export |
| Loading | Runtime | Static Analysis |
| Tree Shaking | No | Yes |
| Browser Support | No | Yes |
| Async Loading | No | Yes |
| Standard | Node Legacy | Official JS Standard |

---

## Example Comparison

CommonJS:

```js
const fs = require("fs");
```

ESM:

```js
import fs from "fs";
```

---

# Interview Answers

---

## What is the Prototype Chain?

```text
A mechanism through which JavaScript objects inherit properties and methods from other objects. When a property is not found on an object, JavaScript searches its prototype and continues up the chain until null is reached.
```

---

## Spread vs Rest?

```text
Spread expands values.

Rest collects values.
```

Examples:

```js
const arr = [...nums]; // Spread

function sum(...args) {} // Rest
```

---

## Why Use Generators?

```text
Generators create iterators automatically and allow execution to pause and resume using yield, making them useful for lazy evaluation and large datasets.
```

---

## ES Modules vs CommonJS?

```text
ES Modules use import/export, support static analysis and tree-shaking, and are the official JavaScript standard. CommonJS uses require/module.exports and is loaded dynamically at runtime.
```
