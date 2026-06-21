# Exercises — JavaScript Runtime

1. Predict output order

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

2. Convert a blocking operation to non-blocking: rewrite a synchronous file read into an async version with `fs.readFile` or `fetch`.

3. Explain in one paragraph what the Event Loop does and why microtasks have priority.

4. Draw (or reproduce) the golden runtime diagram and explain each component in one sentence.

See `09-solutions.md` for suggested answers.
