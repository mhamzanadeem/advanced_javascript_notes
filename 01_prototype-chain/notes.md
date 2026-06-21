
---

# 1. Prototype Chain

---

## What is a Prototype?

In JavaScript, every object has an internal reference to another object called its **prototype**.

When a property or method is not found on an object, JavaScript automatically looks for it in its prototype.

```js
const user = {
    name: "Hamza"
};

console.log(user.name); // Found directly on object
console.log(user.age);  // Not found
```

---

## Basic Prototype Lookup

```js
const animal = {
    eats: true
};

const dog = {
    bark() {
        console.log("Woof!");
    }
};

Object.setPrototypeOf(dog, animal);

console.log(dog.eats);
```

### Lookup Process

```text
dog.eats

1. Look inside dog
2. Not found
3. Look inside animal
4. Found => true
```

---

## Visualizing Prototype Chain

```text
dog
 │
 ▼
animal
 │
 ▼
Object.prototype
 │
 ▼
null
```

---

## Checking Prototype

```js
const person = {
    name: "John"
};

console.log(Object.getPrototypeOf(person));
```

---

## Constructor Functions and Prototypes

Before ES6 classes, constructor functions were common.

```js
function User(name) {
    this.name = name;
}

User.prototype.sayHello = function () {
    console.log(`Hello ${this.name}`);
};

const u1 = new User("Hamza");

u1.sayHello();
```

---

## Why Methods Go on Prototype

Bad:

```js
function User(name) {
    this.name = name;

    this.sayHello = function () {
        console.log("Hello");
    };
}
```

Every instance gets a new copy.

Good:

```js
function User(name) {
    this.name = name;
}

User.prototype.sayHello = function () {
    console.log("Hello");
};
```

All instances share one method.

Memory efficient.

---

## Prototype Chain Example

```js
const grandParent = {
    country: "Pakistan"
};

const parent = {
    city: "Rawalpindi"
};

const child = {
    name: "Hamza"
};

Object.setPrototypeOf(parent, grandParent);
Object.setPrototypeOf(child, parent);

console.log(child.name);
console.log(child.city);
console.log(child.country);
```

Output:

```text
Hamza
Rawalpindi
Pakistan
```

---

## Classes Are Prototype-Based

```js
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

const user = new User("Hamza");

user.greet();
```

Internally:

```js
User.prototype.greet = function() {}
```

Classes are syntactic sugar over prototypes.

---

## Interview Question

### How does JavaScript find a property?

```js
obj.property
```

Steps:

```text
1. Search in obj
2. Search in obj prototype
3. Search in prototype's prototype
4. Continue until null
5. Return undefined if not found
```
