// ===============================
// COMMONJS (NODE LEGACY)
// ===============================

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};


// ===============================
// ES MODULES (MODERN JS)
// ===============================

// named export
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// default export
export default function multiply(a, b) {
    return a * b;
}


// ===============================
// COMMONJS vs ESM USAGE
// ===============================

// CommonJS
// const math = require("./commonjs");

// ES Modules
// import multiply, { add } from "./esm.mjs";

/*
KEY DIFFERENCES:

CommonJS:
- require()
- module.exports
- runtime loading

ESM:
- import/export
- static analysis
- tree-shaking support
- modern standard
*/