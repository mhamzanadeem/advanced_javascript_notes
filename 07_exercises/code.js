// 07_exercises/code.js
// 30 runnable exercises. Run with:
//  node code.js <n>    -> run exercise n (1..30)
//  node code.js all    -> run all exercises in sequence

const exercises = [];

function push(id, title, desc, fn) {
    exercises.push({ id, title, desc, fn });
}

// 1. Prototype chain (3-level)
// Explanation: Show how objects inherit properties via the prototype chain.
// Hint: Use `Object.create(parent)` to set the prototype of the child to the parent.
push(1, 'Prototype chain', 'Create grandParent -> parent -> child and show inherited prop', () => {
    const grand = { species: 'human' };
    const parent = Object.create(grand);
    parent.name = 'Parent';
    const child = Object.create(parent);
    child.name = 'Child';
    return `${child.name} is ${child.species} (inherited)`;
});

// 2. Destructuring & spread
// Explanation: Extract specific properties and gather the rest using spread.
// Hint: Use `{ name, ...rest } = obj` to pick `name` and collect remaining props.
push(2, 'Destructuring & spread', 'Extract name and spread rest', () => {
    const user = { name: 'A', age: 20, city: 'X' };
    const { name, ...rest } = user;
    return { name, rest };
});

// 3. Optional chaining
// Explanation: Prevent errors when accessing deep properties that may not exist.
// Hint: Use `obj?.a?.b?.c` to safely access nested keys.
push(3, 'Optional chaining', 'Safely access deep property', () => {
    const obj = { a: { b: { c: 5 } } };
    const safe = obj?.a?.b?.c ?? 'missing';
    const missing = obj?.x?.y?.z ?? 'missing';
    return { safe, missing };
});

// 4. Custom iterator for array
// Explanation: Demonstrates the iterator protocol using `Symbol.iterator`.
// Hint: Arrays already implement the iterator, but you can use `it.next()` manually.
push(4, 'Custom iterator', 'Create iterator for [1,2,3,4]', () => {
    const arr = [1,2,3,4];
    const it = arr[Symbol.iterator]();
    const out = [];
    let r;
    while (!(r = it.next()).done) out.push(r.value);
    return out;
});

// 5. Fibonacci generator
// Explanation: Uses a generator to lazily produce Fibonacci numbers.
// Hint: Use `function*` and `yield` to return successive values on demand.
push(5, 'Fibonacci generator', 'First 7 Fibonacci numbers', () => {
    function* fib() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
    const g = fib();
    const res = [];
    for (let i=0;i<7;i++) res.push(g.next().value);
    return res;
});

// 6. range generator
// Explanation: Build a small generator that yields a sequence of numbers.
// Hint: `for` loop with `yield` works like a lazy-producing array.
push(6, 'Range generator', 'range(1,10,2) -> [1,3,5,7,9]', () => {
    function* range(start, end, step=1){
        for (let i=start;i<end;i+=step) yield i;
    }
    return [...range(1,10,2)];
});

// 7. Debounce
// Explanation: Debounce ensures a function runs only after activity stops.
// Hint: Useful for resizing or input events; implement with `setTimeout` + `clearTimeout`.
push(7, 'Debounce', 'Debounce wrapper returns function that delays calls', () => {
    function debounce(fn, wait){
        let t;
        return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), wait); };
    }
    let called = 0;
    const deb = debounce(()=> called++, 10);
    deb(); deb(); deb(); // only last should count after delay
    return new Promise(res=> setTimeout(()=> res(called), 20));
});

// 8. Throttle
// Explanation: Throttle limits how often a function may run during continuous events.
// Hint: Track last execution timestamp and ignore calls within `wait` ms.
push(8, 'Throttle', 'Throttle wrapper allows calls at most once per wait', () => {
    function throttle(fn, wait){
        let last = 0;
        return (...a)=>{ const now = Date.now(); if (now - last >= wait) { last = now; fn(...a); } };
    }
    let n=0; const t = throttle(()=> n++, 10);
    t(); t(); t();
    return n; // likely 1
});

// 9. Deep clone (simple)
// Explanation: Simple JSON-based deep clone; not suitable for functions or special types.
// Hint: Use `JSON.parse(JSON.stringify(obj))` for plain objects.
push(9, 'Deep clone', 'Clone nested object (JSON method)', () => {
    const src = { a:1, b:{ c:2 } };
    const copy = JSON.parse(JSON.stringify(src));
    copy.b.c = 5;
    return { src, copy };
});

// 10. Flatten array
// Explanation: Recursively flatten nested arrays to a single array.
// Hint: Use recursion plus `Array.prototype.reduce` to concatenate values.
push(10, 'Flatten array', 'Flatten [[1,2],[3,[4]]] to [1,2,3,4]', () => {
    const arr = [1, [2, [3, 4]], 5];
    const flat = (a)=> a.reduce((s,x)=> Array.isArray(x)? s.concat(flat(x)) : s.concat(x), []);
    return flat(arr);
});

// 11. Unique using Set
// Explanation: Remove duplicate values using the `Set` data structure.
// Hint: Convert array to `Set` then back to array.
push(11, 'Unique values', 'Remove duplicates from array', () => {
    const a = [1,2,2,3,4,4];
    return Array.from(new Set(a));
});

// 12. Sum of primes below N
// Explanation: Check primality and accumulate primes under a limit.
// Hint: Test divisors up to `sqrt(n)` for efficiency.
push(12, 'Sum primes', 'Sum primes below 20', () => {
    const isPrime = n=>{ if (n<2) return false; for (let i=2;i*i<=n;i++) if (n%i===0) return false; return true; };
    let sum=0; for (let i=2;i<20;i++) if(isPrime(i)) sum+=i; return sum;
});

// 13. Async/await simulation
// Explanation: Show how `async/await` waits for a promise to resolve.
// Hint: Wrap `setTimeout` in a Promise and `await` it inside an `async` function.
push(13, 'Async simulation', 'Return value after delay using Promise', async () => {
    const wait = ms=> new Promise(r=> setTimeout(()=> r('done'), ms));
    return await wait(10);
});

// 14. Promise.all vs race demo
// Explanation: Contrast waiting for all promises vs first settled one.
// Hint: `Promise.all` waits for all, `Promise.race` resolves with the first.
push(14, 'Promise.all vs race', 'Show difference', async () => {
    const p1 = new Promise(r=> setTimeout(()=> r('A'), 20));
    const p2 = new Promise(r=> setTimeout(()=> r('B'), 10));
    const all = await Promise.all([p1,p2]);
    const race = await Promise.race([p1,p2]);
    return { all, race };
});

// 15. Memoize factorial
// Explanation: Cache computed results to avoid repeated work (dynamic programming).
// Hint: Store results in an object keyed by the argument.
push(15, 'Memoize', 'Memoize factorial', () => {
    const mem = {};
    const fact = n => { if (n<=1) return 1; if (mem[n]) return mem[n]; mem[n]=n*fact(n-1); return mem[n]; };
    return fact(8);
});

// 16. Currying
// Explanation: Transform a function so it can be called with one arg at a time.
// Hint: Return a function from a function to capture the first argument.
push(16, 'Currying', 'Create curried add', () => {
    const add = a => b => a+b;
    return add(2)(3);
});

// 17. Compose
// Explanation: Combine two functions so output of g becomes input of f.
// Hint: Return a new function that calls `g` then `f` on the result.
push(17, 'Compose', 'Compose f and g', () => {
    const compose = (f,g) => x => f(g(x));
    const double = x=> x*2; const inc = x => x+1;
    return compose(double, inc)(3); // double(inc(3)) = 8
});

// 18. Binary search
// Explanation: Efficiently find an element in a sorted array (O(log n)).
// Hint: Maintain `low` and `high` indices and check middle element each step.
push(18, 'Binary search', 'Search value in sorted array', () => {
    const a=[1,2,3,4,5,6,7,8,9];
    const bs=(arr,x)=>{ let l=0,r=arr.length-1; while(l<=r){ const m=(l+r)>>1; if(arr[m]===x) return m; if(arr[m]<x) l=m+1; else r=m-1;} return -1; };
    return bs(a,6);
});

// 19. Quick sort
// Explanation: Divide-and-conquer sort (average O(n log n)).
// Hint: Pick a pivot, partition, then recursively sort partitions.
push(19, 'Quick sort', 'Sort an array', () => {
    const qs = a => a.length<2? a : ( (p=a[0]) => qs(a.slice(1).filter(x=>x<=p)).concat(p, qs(a.slice(1).filter(x=>x>p))) )();
    return qs([5,3,8,1,2,7]);
});

// 20. Simple EventEmitter
// Explanation: Implement a basic pub/sub system with `on` and `emit`.
// Hint: Use a Map to store arrays of listeners for each event key.
push(20, 'EventEmitter', 'Basic emitter with on/emit', () => {
    const emitter = () => {
        const map = new Map();
        return {
            on: (e,fn)=> (map.has(e)? map.get(e).push(fn) : map.set(e,[fn])),
            emit: (e,...a)=> (map.get(e)||[]).forEach(f=>f(...a))
        };
    };
    const em = emitter(); let v=0; em.on('inc', n=> v+=n); em.emit('inc', 3); return v;
});

// 21. Retry wrapper
// Explanation: Retry an async operation several times before giving up.
// Hint: Wrap call in try/catch and loop up to `n` retries.
push(21, 'Retry', 'Retry async function up to N times', async () => {
    let attempts=0;
    const unreliable = async ()=> { attempts++; if (attempts<3) throw new Error('fail'); return 'ok'; };
    const retry = async (fn, n)=>{ for (let i=0;i<n;i++){ try{ return await fn(); }catch(e){ if (i===n-1) throw e; } } };
    return await retry(unreliable, 5);
});

// 22. Email validation
// Explanation: Basic regex check for email format (not exhaustive but practical).
// Hint: Avoid spaces and ensure one `@` and at least one dot in the domain part.
push(22, 'Regex email', 'Validate a simple email', () => {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test('test@example.com') && !re.test('bad@@x');
});

// 23. Query parser
// Explanation: Convert a URL querystring into an object for easy access.
// Hint: `URLSearchParams` is a handy built-in for parsing query strings.
push(23, 'Query parser', 'Parse ?a=1&b=two into object', () => {
    const s='?a=1&b=two';
    return Object.fromEntries(new URLSearchParams(s));
});

// 24. Group by property
// Explanation: Aggregate objects into buckets keyed by a chosen property.
// Hint: Use `reduce` and create arrays for each distinct key.
push(24, 'Group by', 'Group array of objects by key', () => {
    const data=[{t:'a',v:1},{t:'b',v:2},{t:'a',v:3}];
    return data.reduce((acc,o)=>{ (acc[o.t]=acc[o.t]||[]).push(o); return acc; }, {});
});

// 25. Palindrome
// Explanation: Normalize string then compare with its reverse.
// Hint: Remove spaces and ignore case before checking.
push(25, 'Palindrome', 'Check palindrome ignoring case/spaces', () => {
    const s='A man a plan a canal Panama';
    const t = s.toLowerCase().replace(/\s+/g,'');
    return t === t.split('').reverse().join('');
});

// 26. Anagram check
// Explanation: Two strings are anagrams if sorted normalized characters match.
// Hint: Remove spaces and sort characters for comparison.
push(26, 'Anagram', 'Check if two strings are anagrams', () => {
    const norm = s=> s.replace(/\s+/g,'').toLowerCase().split('').sort().join('');
    return norm('listen') === norm('silent');
});

// 27. Word count
// Explanation: Count how many times each word appears in a string.
// Hint: Split on whitespace and accumulate counts using an object.
push(27, 'Word count', 'Count word occurrences in text', () => {
    const txt='the cat and the hat';
    return txt.split(/\s+/).reduce((m,w)=> (m[w]=(m[w]||0)+1,m), {});
});

// 28. LRU cache (simple)
// Explanation: Implement a least-recently-used cache using a `Map` to preserve order.
// Hint: Deleting and re-setting a key moves it to the newest position in a Map.
push(28, 'LRU cache', 'Simple LRU with Map', () => {
    const LRU = (limit=2)=>{
        const map = new Map();
        return {
            get(k){ if(!map.has(k)) return null; const v=map.get(k); map.delete(k); map.set(k,v); return v; },
            set(k,v){ if(map.has(k)) map.delete(k); map.set(k,v); if(map.size>limit) map.delete(map.keys().next().value); }
        };
    };
    const c=LRU(2); c.set('a',1); c.set('b',2); c.get('a'); c.set('c',3); return { hasA: !!c.get('a'), hasB: !!c.get('b'), hasC: !!c.get('c') };
});

// 29. allSettled polyfill
// Explanation: Provide compatibility for environments without `Promise.allSettled`.
// Hint: Wrap each promise with `then`/`catch` to capture fulfillment/rejection status.
push(29, 'Promise.allSettled polyfill', 'Implement a basic allSettled', async () => {
    const allSettled = async (proms) => Promise.all(proms.map(p=> Promise.resolve(p).then(v=>({status:'fulfilled', value:v}), e=>({status:'rejected', reason:e+''}))));
    const res = await allSettled([Promise.resolve(1), Promise.reject('err')]);
    return res;
});

// 30. Binary tree traversal (in-order)
// Explanation: Visit left node, root, then right node recursively to get sorted values.
// Hint: Use recursion; push values into an output array during the visit.
push(30, 'Tree traversal', 'In-order traversal of binary tree', () => {
    const tree = { v:2, left:{v:1}, right:{v:3} };
    const out = [];
    (function inorder(n){ if(!n) return; inorder(n.left); out.push(n.v); inorder(n.right); })(tree);
    return out;
});

async function runOne(n){
    const e = exercises.find(x=> x.id===n);
    if(!e) return console.log('No exercise', n);
    console.log(`\n--- Exercise ${e.id}: ${e.title} ---`);
    console.log(e.desc);
    const out = e.fn();
    if (out instanceof Promise) console.log(await out); else console.log(out);
}

async function runAll(){
    for (const e of exercises){
        await runOne(e.id);
    }
}

const arg = process.argv[2] || 'all';
if (arg === 'all') runAll(); else runOne(Number(arg));

module.exports = { exercises };
