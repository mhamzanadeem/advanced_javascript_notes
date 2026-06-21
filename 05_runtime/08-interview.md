# Interview One-Liners & Mental Model

Quick answers:

- Is JavaScript single-threaded? Yes, one call stack.
- Why doesn't `setTimeout` block? Timers are handled by Web APIs.
- Why do promises run before `setTimeout`? Promise callbacks enter the Microtask Queue which has higher priority than the Task Queue.
- What does the Event Loop do? It moves ready callbacks from queues into the Call Stack when the stack is empty.

Complete mental model (summary):

1. Synchronous code executes on the call stack
2. Async operations go to Web APIs
3. When done, callbacks enter queues
4. Event Loop schedules microtasks first, then tasks

Golden diagram lives in learning slides or can be reproduced in a README.
