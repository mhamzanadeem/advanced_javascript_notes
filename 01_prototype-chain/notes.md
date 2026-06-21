
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

---

## Prototype Mutation — Pitfalls & Safety

Modifying prototypes at runtime is powerful but can be dangerous. Common pitfalls:

- Performance cost: changing an object's prototype with `Object.setPrototypeOf` can de-optimize engines; prefer `Object.create` when establishing an inheritance relationship once.
- Shadowing: adding a property on an object can hide a prototype property of the same name, leading to subtle bugs when code expects the prototype version to run.
- Prototype pollution: be careful when copying untrusted objects onto prototypes — an attacker could inject properties that change behavior globally.

Safe patterns:

- Create objects with `Object.create(proto)` instead of repeatedly mutating prototypes.
- Avoid altering built-in prototypes (`Array.prototype`, `Object.prototype`) in shared code.
- Use composition over inheritance for many real-world cases.

Example — shadowing vs shared method:

```js
const proto = { greet() { return `hi from proto`; } };
const obj = Object.create(proto);
console.log(obj.greet()); // uses prototype method

obj.greet = function () { return `shadowed`; };
console.log(obj.greet()); // now the own property shadows the prototype
```

---

## Advanced `this` & Method Binding

`this` is determined at call-time, not where a function is defined (except arrow functions which lexically capture `this`). Key cases:

- Method call: `obj.method()` → `this` is `obj`.
- Function extraction: `const m = obj.method; m()` → `this` becomes global/undefined in strict mode.
- `call` / `apply` / `bind`: explicitly set `this`.
- Arrow functions: do not have their own `this` — they inherit from the defining scope.

Common bug — losing `this` when passing methods as callbacks:

```js
const user = {
    name: 'Hamza',
    greet() { return this.name; }
};

const fn = user.greet; // extracted
console.log(fn()); // undefined or global name

// Solutions:
const bound = user.greet.bind(user);
console.log(bound()); // 'Hamza'

// or define method as an arrow when class/field syntax available
// class User { greet = () => this.name }
```

When teaching, emphasize the difference between lexical `this` (arrow) and dynamic `this` (regular functions).
