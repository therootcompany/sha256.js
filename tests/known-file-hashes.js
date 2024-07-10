"use strict";

let FsSync = require("node:fs");

let Sha256 = require("../");

{
  let fname = "three.min.js";
  let expHex =
    "1f7805e0870ff94285773806bccc88fa4c992a159b02aa5288e070f1356d3836";
  let buf = FsSync.readFileSync(`./fixtures/${fname}`, null);
  let bytes = new Uint8Array(buf);
  let hash = Sha256.sha256(bytes);
  let bufHash = Buffer.from(hash);
  let hex = bufHash.toString("hex");
  if (hex !== expHex) {
    throw new Error(
      `expected '${fname}' to hash as '${expHex}', but got '${hex}'`,
    );
  }
  console.info(`PASS - correct hash for './fixtures/${fname}'`);
}

{
  let fname = "moment-with-locales.min.js";
  let expHex =
    "f828fba78735e7a4148eecda050132f08449b67c65e0583f7466a9b75deba686";
  let buf = FsSync.readFileSync(`./fixtures/${fname}`, null);
  let bytes = new Uint8Array(buf);
  let hash = Sha256.sha256(bytes);
  let bufHash = Buffer.from(hash);
  let hex = bufHash.toString("hex");
  if (hex !== expHex) {
    throw new Error(
      `expected '${fname}' to hash as '${expHex}', but got '${hex}'`,
    );
  }
  console.info(`PASS - correct hash for './fixtures/${fname}'`);
}
