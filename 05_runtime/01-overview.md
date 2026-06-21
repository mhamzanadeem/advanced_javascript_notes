# What Makes JavaScript Unique?

JavaScript has two important characteristics:

```
JavaScript
├── Synchronous
└── Single Threaded
```

## Synchronous

One operation must finish before the next begins.

Example

```javascript
console.log("1");
console.log("2");
console.log("3");
```

Output:

```
1
2
3
```

## Single Threaded

JavaScript executes one task at a time using a single path of execution.

Why this design?

- Simpler programming model
- Avoids race conditions
- Predictable behaviour in browsers
