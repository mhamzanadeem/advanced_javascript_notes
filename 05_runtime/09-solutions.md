# Solutions — JavaScript Runtime (suggested)

1. Predict output order — Answer:

```
1
4
3
2
```

Explanation: Promise `.then` goes to microtask queue and runs before the `setTimeout` callback which is in the task queue.

2. Converting blocking to non-blocking — Example:

```javascript
// Blocking (synchronous)
const fs = require('fs');
const data = fs.readFileSync('./file.txt', 'utf8');
console.log(data);

// Non-blocking (async)
fs.readFile('./file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

3. Event Loop one-paragraph explanation: Microtasks are drained after each task; they have priority to ensure promise-based continuations run immediately after the current stack finishes.

4. The golden diagram maps Memory Heap, Call Stack, Web APIs, Microtask and Task queues and the Event Loop orchestrating moves between them.
