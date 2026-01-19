# Node.js Architecture – Theory Explanation

## 1. Node.js Architecture

Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser.  
It follows a **single-threaded, non-blocking, event-driven** architecture.

### Key Points
- Uses one main thread
- Handles multiple requests asynchronously
- Suitable for scalable network applications

---

## 2. JavaScript Engine (V8)

### What is V8?
- V8 is the JavaScript engine used by Node.js
- Written in C++
- Converts JavaScript into machine code

### Role of V8
- Executes JavaScript code
- Performs Just-In-Time (JIT) compilation
- Manages memory and garbage collection

---

## 3. Node.js Core APIs

### What are Core APIs?
Core APIs are built-in modules that allow JavaScript to interact with the system.

### Examples
- `fs` – File system
- `http` – Web server
- `path` – Path handling
- `os` – System information

### Purpose
- Provide system-level functionality
- Maintain cross-platform compatibility

---

## 4. Native Bindings

### What are Native Bindings?
- Connect JavaScript with C/C++ code
- Act as a bridge between JS and OS

### Why they are needed
- JavaScript cannot access OS resources directly
- Native bindings translate JS calls into system calls

---

## 5. Event Loop

### What is the Event Loop?
The event loop continuously checks for pending tasks and executes them without blocking the main thread.

### Responsibilities
- Executes callbacks
- Handles asynchronous operations
- Keeps the application responsive

---

## 6. libuv

### 6.1 What is libuv?
- A C library used internally by Node.js
- Provides asynchronous I/O support

### 6.2 Why Node.js needs libuv
- OS operations are blocking by default
- libuv makes them non-blocking

### 6.3 Responsibilities of libuv
- Event loop management
- File system and network I/O
- Thread pool handling
- Cross-platform abstraction

---

## 7. Thread Pool

### 7.1 What is a Thread Pool?
- A group of background threads managed by libuv
- Executes blocking operations

### 7.2 Why Node.js uses a Thread Pool
- Prevents blocking the event loop
- Improves performance

### 7.3 Operations handled by the Thread Pool
- File system operations
- Cryptography tasks
- DNS lookups
- Compression

---

## 8. Worker Threads

### 8.1 What are Worker Threads?
- Separate threads that run JavaScript in parallel
- Each has its own event loop

### 8.2 Why Worker Threads are needed
- To handle CPU-intensive JavaScript tasks
- To avoid blocking the main thread

### 8.3 Difference between Thread Pool and Worker Threads

| Thread Pool | Worker Threads |
|------------|---------------|
| Managed by libuv | Managed by Node.js |
| Used for I/O tasks | Used for CPU-heavy JS |
| Does not execute JS | Executes JavaScript |

---

## 9. Event Loop Queues

### 9.1 Macro Task Queue
Contains:
- `setTimeout`
- `setInterval`
- `setImmediate`
- I/O callbacks

### 9.2 Micro Task Queue
Contains:
- `Promise.then`
- `Promise.catch`
- `async/await`
- `process.nextTick`

---

## 9.3 Execution Priority
- Micro Task Queue executes first
- Macro Task Queue executes after microtasks

---

## 9.4 Examples

### Micro Task Example
```js
Promise.resolve().then(() => {
  console.log("Micro Task");
});
