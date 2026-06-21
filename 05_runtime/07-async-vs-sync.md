# Blocking vs Non-Blocking (Async vs Sync)

Blocking code stops program execution until it completes (e.g., `readFileSync`).

Non-blocking code allows other work to continue (e.g., `readFile` with callback or promises).

Benefits of non-blocking:

- Responsive UI
- Better throughput

Why async exists: to avoid freezing the UI for long-running operations.
