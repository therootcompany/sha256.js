"use strict";

let Sha256 = require("../");

{
  let msg = "Hello, World!";
  let encoder = new TextEncoder();
  let bytes = encoder.encode(msg);
  let hash = Sha256.sha256(bytes);
  let hs = [];
  for (let b of hash) {
    let h = b.toString(16);
    h = h.padStart(2, "0");
    hs.push(h);
  }

  let helloHash = hs.join("");
  let expHash =
    "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f";
  if (helloHash !== expHash) {
    throw new Error(`'${msg}' did not hash to '${expHash}'`);
  }
}

// Taken from https://github.com/dchest/fast-sha256-js/blob/master/test/data/sha256.random.js,
// which is in the Public Domain

let Tests = require("../fixtures/known-random-hashes.json");
for (let [input64, exp64] of Tests) {
  let buf = Buffer.from(input64, "base64");
  let bytes = new Uint8Array(buf);
  let hash = Sha256.sha256(bytes);
  let hashBuf = Buffer.from(hash);
  let hash64 = hashBuf.toString("base64");
  if (hash64 !== exp64) {
    throw new Error(
      `expected '${input64}' to hash as '${exp64}', but got '${hash64}'`,
    );
  }
}

let total = Tests.length + 1 + 1 + 1;
console.info(`PASS ${total} tests`);
