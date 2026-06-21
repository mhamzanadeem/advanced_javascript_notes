# JavaScript Runtime Architecture

Key parts of the runtime:

- Memory Heap
- Call Stack
- Web APIs
- Queues (Task & Microtask)
- Event Loop

Together they form the JavaScript runtime environment.

## Web APIs

Web APIs are provided by the browser (not part of the JS language). Examples: `setTimeout`, `fetch`, `DOM`.

Why they exist: they provide capabilities JS alone cannot perform (timers, network, DOM).
