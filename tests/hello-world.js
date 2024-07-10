"use strict";

let Sha256 = require("../");

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
console.info(`PASS - correct hash for 'Hello, World!'`);
