# JavaScript Runtime Internals - Complete Notes

---

# Table of Contents

1. What Makes JavaScript Unique?
2. Synchronous Nature
3. Single Threaded Nature
4. Execution Context
5. Memory Heap
6. Call Stack
7. How JavaScript Executes Code
8. JavaScript Runtime Architecture
9. Web APIs
10. Callback Queue (Task Queue)
11. Microtask Queue
12. Event Loop
13. Promise vs setTimeout
14. Blocking vs Non-Blocking Code
15. Async Operations
16. Interview Questions
17. Mental Model

---

# 1. What Makes JavaScript Unique?

JavaScript has two important characteristics:

```text
JavaScript
├── Synchronous
└── Single Threaded
```

---

## Synchronous

### Fundamental Concept

Synchronous means:

> One operation must finish before the next operation begins.

Example:

```javascript
console.log("1");
console.log("2");
console.log("3");
```

Output:

```text
1
2
3
```

Execution:

```text
Line 1 executes
↓
Completes
↓
Line 2 executes
↓
Completes
↓
Line 3 executes
```

JavaScript never skips ahead.

---

### Thought Process

Imagine a cashier serving customers.

```text
Customer 1
↓
Customer 2
↓
Customer 3
```

Customer 2 must wait.

Customer 3 must also wait.

This is synchronous execution.

---

### Why Do We Need It?

Without synchronous behavior:

```javascript
let total = calculate();
print(total);
```

`print()` could execute before `calculate()` finishes.

That would create chaos.

---

# 2. Single Threaded

### Fundamental Concept

JavaScript has:

```text
ONE THREAD
```

Only one task executes at a time.

---

### What Is A Thread?

A thread is a path of execution.

Example:

```text
Thread
↓
Instruction 1
↓
Instruction 2
↓
Instruction 3
```

JavaScript has only one such path.

---

### Thought Process

Imagine one chef.

```text
Cook Burger
↓
Cook Pizza
↓
Cook Fries
```

The chef cannot do all three simultaneously.

---

### Why Was JavaScript Designed This Way?

Benefits:

* Simpler programming model
* Avoids race conditions
* Easier browser implementation
* Predictable behavior

---

# 3. Execution Context

## Fundamental Concept

Execution Context is:

> The environment in which JavaScript code executes.

Whenever JS executes code, it creates an execution context.

---

## Types

### Global Execution Context

Created automatically.

```javascript
console.log("Hello");
```

Browser creates:

```text
Global Execution Context
```

first.

---

### Function Execution Context

Created whenever a function runs.

```javascript
function greet() {
    console.log("Hi");
}

greet();
```

New execution context created for:

```javascript
greet()
```

---

# 4. Memory Heap

## Fundamental Concept

Memory Heap stores:

* Variables
* Objects
* Arrays
* Functions

---

Example:

```javascript
let name = "Hamza";
let age = 22;
```

Stored in:

```text
Memory Heap
├── name
└── age
```

---

### Think Of It As

A warehouse.

```text
Warehouse
├── Data
├── Objects
├── Arrays
└── Functions
```

---

# 5. Call Stack

## Fundamental Concept

Call Stack keeps track of:

> Which function is currently executing.

---

Example

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

---

Stack Evolution

### Step 1

```text
CALL STACK

Global
```

---

### Step 2

```text
CALL STACK

one()
Global
```

---

### Step 3

```text
CALL STACK

two()
one()
Global
```

---

### Step 4

```text
CALL STACK

three()
two()
one()
Global
```

---

### Step 5

```text
CALL STACK

two()
one()
Global
```

three() removed after completion.

---

### Rule

```text
LIFO
Last In First Out
```

Same as plates in a stack.

---

# 6. How JavaScript Executes Code

Example:

```javascript
function sayHello() {
    console.log("Hello");
}

sayHello();
```

Execution:

```text
Global Context Created
↓
sayHello() Added To Stack
↓
console.log() Executes
↓
sayHello() Removed
↓
Global Context Ends
```

---

# 7. JavaScript Runtime Architecture

```text
Memory Heap
        +
Call Stack
        +
Web APIs
        +
Queues
        +
Event Loop
```

Together they form:

```text
JavaScript Runtime Environment
```

---

# 8. Web APIs

## Fundamental Concept

Web APIs are NOT part of JavaScript.

They are provided by the browser.

Examples:

```text
DOM
setTimeout
setInterval
fetch
localStorage
Geolocation
```

---

### Why Do We Need Them?

JavaScript alone cannot:

```javascript
setTimeout()
fetch()
document.querySelector()
```

Browser provides these capabilities.

---

# 9. setTimeout Flow

Example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 2000);

console.log("End");
```

Execution:

```text
Start
End
Timeout
```

---

Why?

Step 1

```text
setTimeout enters stack
```

Step 2

```text
Browser Web API handles timer
```

---

## Memory Leaks — Patterns, Detection & Prevention

Even single-threaded JS programs can leak memory. Common leak patterns:

- **Global variables / accidental globals** — variables left on the global object remain reachable for the life of the page.
- **Forgotten timers or intervals** — `setInterval` or pending `setTimeout` callbacks keep closures alive.
- **Detached DOM nodes** — DOM elements removed from the document but still referenced by JS (e.g., stored in a cache) cannot be freed.
- **Closures keeping large objects** — long-lived closures (event handlers, timers) capturing large scopes.
- **Unbounded caches** — Maps/Sets used as caches without eviction grow indefinitely.

Detection techniques:

- Use Chrome DevTools Heap snapshots and compare allocations before/after interactions.
- Use the Allocation instrumentation timeline to find detached DOM trees.
- Look for listeners in the Event Listeners panel that should have been removed.

Prevention & mitigations:

- Avoid polluting the global scope. Use modules or IIFEs to limit lifetime.
- Clear timers when no longer needed: `clearInterval` / `clearTimeout`.
- Remove event listeners when elements are removed: `element.removeEventListener(...)`.
- Prefer `WeakMap`/`WeakSet` for caches that should not prevent GC of keys.

Example — timer leak and fix:

```js
function startPolling() {
    const id = setInterval(() => {
        // heavy work
    }, 1000);

    // If caller forgets to clear, interval keeps closure alive
    return () => clearInterval(id);
}

const stop = startPolling();
// later:
stop(); // prevents leak by clearing interval
```

Small changes in code and discipline go a long way — teach students to ask "who holds a reference to this object, and when can it be released?".

Step 3

```text
Callback registered
```

Step 4

```text
After 2 sec
↓
Task Queue
```

Step 5

```text
Event Loop
↓
Moves callback to Call Stack
```

Step 6

```text
Timeout printed
```

---

# 10. Callback Queue (Task Queue)

## Fundamental Concept

Stores callbacks from:

```text
setTimeout
setInterval
DOM Events
```

---

Example:

```javascript
setTimeout(callback);
```

After timer completes:

```text
Task Queue
┌──────┐
│ CB1  │
│ CB2  │
└──────┘
```

Waiting for stack to become empty.

---

# 11. Microtask Queue

## Fundamental Concept

Special high-priority queue.

Stores:

```text
Promises
MutationObservers
queueMicrotask()
```

---

Example:

```javascript
Promise.resolve().then(() => {
    console.log("Promise");
});
```

Goes into:

```text
Microtask Queue
```

---

# Why Does It Exist?

Promises should execute before normal callbacks.

Therefore:

```text
Microtask Queue
Higher Priority

Task Queue
Lower Priority
```

---

# 12. Event Loop

## Fundamental Concept

Event Loop is a scheduler.

Its job:

```text
Check Call Stack
↓
Is Stack Empty?
↓
YES
↓
Move Queue Item To Stack
```

Repeat forever.

---

### Thought Process

Event Loop acts like a traffic police officer.

```text
Stack Busy?
↓
Wait

Stack Empty?
↓
Send Next Task
```

---

# 13. Promise vs setTimeout

Example:

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
```

Output:

```text
1
4
3
2
```

---

Why?

```text
Promise
↓
Microtask Queue
↓
Higher Priority

setTimeout
↓
Task Queue
↓
Lower Priority
```

---

# Priority Order

```text
Call Stack
↓
Microtask Queue
↓
Task Queue
```

---

# 14. Blocking Code

## Fundamental Concept

Blocking code stops program execution.

Example:

```javascript
readFileSync()
```

---

Execution

```text
Read File
↓
Wait
↓
Wait
↓
Wait
↓
Continue
```

Everything is frozen.

---

### Problem

User interface becomes unresponsive.

---

# 15. Non-Blocking Code

## Fundamental Concept

Allows other code to execute while operation continues.

Example:

```javascript
readFile()
```

---

Execution

```text
Start File Read
↓
Continue Other Work
↓
File Finishes
↓
Callback Executes
```

---

Benefits:

* Better performance
* Responsive UI
* Efficient resource usage

---

# 16. Why Async Exists

Suppose:

```javascript
Download 500 MB File
```

If synchronous:

```text
UI Frozen
5 Minutes
```

Bad user experience.

---

Instead:

```text
Start Download
↓
Continue Running App
↓
Notify When Done
```

This is asynchronous programming.

---

# 17. Complete Mental Model

When JavaScript Runs:

```text
1. Code enters Call Stack

2. Synchronous code executes immediately

3. Async operations move to Web APIs

4. Web APIs finish work

5. Callbacks enter Queue

6. Event Loop monitors Stack

7. Stack Empty?

      YES

8. Microtasks execute first

9. Task Queue executes next

10. Process repeats forever
```

---

# Golden Interview Diagram

```text
                    Browser

 ┌───────────────────────────┐
 │         Memory Heap       │
 └───────────────────────────┘

 ┌───────────────────────────┐
 │         Call Stack        │
 └───────────────────────────┘
              │
              ▼
 ┌───────────────────────────┐
 │          Web APIs         │
 │ setTimeout                │
 │ fetch                     │
 │ DOM                       │
 └───────────────────────────┘
              │
      ┌───────┴────────┐
      ▼                ▼

 ┌──────────────┐  ┌──────────────┐
 │ Microtasks   │  │ Task Queue   │
 │ Promise.then │  │ setTimeout   │
 └──────────────┘  └──────────────┘
          ▲            ▲
          └─────┬──────┘
                │
          Event Loop
                │
                ▼
           Call Stack
```

---

# Interview One-Liners

### Is JavaScript single-threaded?

Yes, JavaScript executes code using a single call stack.

---

### Why doesn't setTimeout block execution?

Because timers are handled by browser Web APIs.

---

### Why do Promises run before setTimeout?

Because Promise callbacks go to the Microtask Queue, which has higher priority than the Task Queue.

---

### What does the Event Loop do?

It moves ready callbacks from queues into the Call Stack when the stack becomes empty.

---

### What is the difference between synchronous and asynchronous code?

Synchronous code blocks execution until completion, while asynchronous code allows other operations to continue executing.
