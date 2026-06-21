# Event Loop, Task Queue & Microtask Queue

Example (setTimeout flow):

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 2000);

console.log("End");
```

Output:

```
Start
End
Timeout
```

Flow:

1. `setTimeout` is handed to browser Web API
2. After timer, callback enters Task Queue
3. Event Loop moves it to Call Stack when stack is empty

## Microtask Queue

Microtasks (Promises, `queueMicrotask`, `MutationObserver`) have higher priority than tasks.

Example

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

Output:

```
1
4
3
2
```

Priority order:

1. Call Stack
2. Microtask Queue
3. Task Queue
