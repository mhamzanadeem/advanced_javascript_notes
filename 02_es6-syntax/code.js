// ===============================
// ES6+ MODERN JAVASCRIPT
// ===============================

// -------------------------------
// 1. Destructuring
// -------------------------------

const user = {
    name: "Hamza",
    age: 22,
    profile: {
        city: "Rawalpindi"
    }
};

const { name, age } = user;
console.log(name, age);

// nested destructuring
const { profile: { city } } = user;
console.log(city);

// -------------------------------
// 2. Array destructuring
// -------------------------------

const nums = [10, 20, 30];

const [a, b] = nums;
console.log(a, b);

// -------------------------------
// 3. Spread operator
// -------------------------------

const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];
console.log(merged);

// object spread
const updatedUser = {
    ...user,
    country: "Pakistan"
};

// -------------------------------
// 4. Rest operator
// -------------------------------

function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3));

// -------------------------------
// 5. Optional chaining
// -------------------------------

const obj = {};

console.log(obj.profile?.city); // safe access

// -------------------------------
// 6. Nullish coalescing
// -------------------------------

const value = 0;

console.log(value ?? 100); // 0 (not overridden)

// -------------------------------
// INTERVIEW CHECKPOINT
// -------------------------------
/*
Spread = expands values
Rest = collects values
*/