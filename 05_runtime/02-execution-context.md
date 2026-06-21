# Execution Context

Execution Context is the environment where JavaScript code runs. A context is created whenever code executes.

## Types

- Global Execution Context — created automatically when the program starts.
- Function Execution Context — created each time a function runs.

Example:

```javascript
function greet() {
    console.log("Hi");
}

greet();
```

When `greet()` runs a new function execution context is pushed onto the call stack.
