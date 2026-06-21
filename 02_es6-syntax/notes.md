
---

# 2. ES6+ Syntax

---

# Destructuring

---

## Array Destructuring

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);
console.log(second);
```

Output:

```text
red
green
```

---

## Skip Values

```js
const nums = [10, 20, 30];

const [a, , c] = nums;

console.log(a);
console.log(c);
```

---

## Default Values

```js
const [x = 100] = [];

console.log(x);
```

Output:

```text
100
```

---

## Object Destructuring

```js
const user = {
    name: "Hamza",
    age: 22
};

const { name, age } = user;

console.log(name);
console.log(age);
```

---

## Rename Variables

```js
const user = {
    name: "Hamza"
};

const { name: userName } = user;

console.log(userName);
```

---

## Nested Destructuring

```js
const user = {
    profile: {
        city: "Rawalpindi"
    }
};

const {
    profile: { city }
} = user;

console.log(city);
```

---

# Spread Operator (...)

---

## Arrays

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged);
```

Output:

```text
[1,2,3,4]
```

---

## Copy Array

```js
const original = [1, 2, 3];

const copy = [...original];
```

---

## Objects

```js
const user = {
    name: "Hamza"
};

const updated = {
    ...user,
    age: 22
};

console.log(updated);
```

---

## Override Properties

```js
const obj = {
    age: 20
};

const updated = {
    ...obj,
    age: 25
};

console.log(updated.age);
```

Output:

```text
25
```

---

# Rest Operator (...)

---

## Function Parameters

```js
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3, 4));
```

---

## Object Rest

```js
const user = {
    name: "Hamza",
    age: 22,
    city: "Rawalpindi"
};

const { name, ...rest } = user;

console.log(rest);
```

---

# Optional Chaining

---

## Problem

```js
const user = {};

console.log(user.profile.city);
```

Error:

```text
Cannot read property
```

---

## Solution

```js
const user = {};

console.log(user.profile?.city);
```

Output:

```text
undefined
```

---

## Multiple Levels

```js
user?.profile?.address?.city
```

---

## Function Calls

```js
user.getName?.();
```

Runs only if function exists.

---

# Nullish Coalescing

---

```js
const name = null;

console.log(name ?? "Guest");
```

Output:

```text
Guest
```

---

## Difference from ||

```js
console.log(0 || 100);
```

Output:

```text
100
```

Problem: 0 is treated as false.

```js
console.log(0 ?? 100);
```

Output:

```text
0
```
