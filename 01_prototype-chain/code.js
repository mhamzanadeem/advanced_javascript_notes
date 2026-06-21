// ===============================
// PROTOTYPE CHAIN (CORE CONCEPT)
// ===============================

// Every object in JS has a hidden link called [[Prototype]]

const animal = {
    eats: true,
    walk() {
        console.log("Animal walking");
    }
};

const dog = {
    bark() {
        console.log("Woof!");
    }
};

// Link dog -> animal
Object.setPrototypeOf(dog, animal);

// -------------------------------
// Property lookup flow
// -------------------------------

console.log(dog.bark()); // own method
console.log(dog.eats);   // found in prototype (animal)

// -------------------------------
// Prototype chain visualization
// dog → animal → Object.prototype → null
// -------------------------------

// -------------------------------
// Constructor function pattern
// -------------------------------

function User(name) {
    this.name = name;
}

// shared method (memory efficient)
User.prototype.sayHello = function () {
    console.log(`Hello ${this.name}`);
};

const u1 = new User("Hamza");
const u2 = new User("Ali");

u1.sayHello();
u2.sayHello();

// -------------------------------
// INTERVIEW CHECKPOINT
// -------------------------------
/*
Q: What happens when accessing a missing property?

A:
JS searches in this order:
1. Object itself
2. Prototype
3. Prototype's prototype
4. Until null
*/