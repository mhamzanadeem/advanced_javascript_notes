# Call Stack

The call stack keeps track of which function is currently executing (LIFO).

Example:

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Hello");
}

one();
```

Stack evolution (top → bottom): `three()`, `two()`, `one()`, `Global` when `three` runs.

Rule: Last In, First Out.
