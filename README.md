# [@root/sha256](https://github.com/therootcompany/sha256.js)

A brower, node, and bun-compatible synchronous sha256 implementation using typed
arrays

## For Browsers

```html
<script src="https://unpkg.com/@root/sha256@1/sha256.js"></script>
```

```js
let Sha256 = window.Sha56;

let msg = "Hello, World!";
let encoder = new TextEncoder();
let bytes = encoder.encode(msg);

let hashBytes = Sha256.sha256(bytes);
console.log(hashBytes);
```

```js
let hex = bytesToHex(hashBytes);
console.log(hex);

function bytesToHex(bytes) {
  let hexes = [];

  for (let b of bytes) {
    let h = b.toString(16);
    h = h.padStart(2, "0");
    hexes.push(b);
  }

  let hex = hexes.join("");
  return hex;
}
```

## For Node, Bun, and Bundlers

```sh
npm install --save @root/sha256@1
```

```js
let Sha256 = require("@root/sha256");

let msg = "Hello, World!";
let encoder = new TextEncoder();
let bytes = encoder.encode(msg);

let hashBytes = Sha256.sha256(bytes);
console.log(hashBytes);

let buf = Buffer.from(hashBytes);
let hex = buf.toString("hex");
console.log(hex);
```

## Why?

- WebCrypto's SHA-256 is asynchronous, which means:
  - it's very slow (context switches on each call)
  - it colors all the functions (sha256 is cpu-bound and typically sync)
- Other popular implementations have bespoke psuedo-buffers (not `TypedArray`s)
- Refactoring other implementations is tedious and error-prone

## References

Since hundreds (if not thousands) of correct implementations exist, this was
primarily generated via prompt-engineering rather than ported by hand (which is
error-prone due to the differences in endianness, int width and sign, etc).
However, the code has been manually compared to other implementations for
correctness, and the results have been verified through over a thousand tests.

To compare to other known-working implementations, consider:

- https://sha256algorithm.com/
  - https://github.com/dmarman/sha256algorithm/blob/main/src/classes/sha.js
- https://brillout.github.io/test-javascript-hash-implementations/
- https://github.com/dchest/fast-sha256-js/blob/master/src/sha256.ts
- https://github.com/digitalbazaar/forge/blob/main/lib/sha256.js
- https://gist.github.com/bryanchow/1649353
- https://github.com/brix/crypto-js/blob/develop/src/sha256.js

## License

Copyright 2024 AJ ONeal (MPL-2.0 License)
