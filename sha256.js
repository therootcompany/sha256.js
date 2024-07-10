//@ts-ignore
var Sha256 = ("object" === typeof module && exports) || {};
(function (window, Sha256) {
  "use strict";
  /* jshint bitwise: false */

  let K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);

  /**
   * @param {Number} value
   * @param {Number} amount
   */
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  /**
   * @param {Uint8Array} bytes
   */
  Sha256.sha256 = function (bytes) {
    let H = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]);

    let padded = new Uint8Array((bytes.length + 9 + 63) & ~63);
    padded.set(bytes);
    padded[bytes.length] = 0x80;
    let dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 4, bytes.length << 3, false);

    let w = new Uint32Array(64);
    for (let i = 0; i < padded.length; i += 64) {
      for (let j = 0; j < 16; j += 1) {
        w[j] =
          (padded[i + 4 * j] << 24) |
          (padded[i + 4 * j + 1] << 16) |
          (padded[i + 4 * j + 2] << 8) |
          padded[i + 4 * j + 3];
      }
      for (let j = 16; j < 64; j += 1) {
        let w1 = w[j - 15];
        let w2 = w[j - 2];
        let s0 = rightRotate(w1, 7) ^ rightRotate(w1, 18) ^ (w1 >>> 3);
        let s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[j] = w[j - 16] + s0 + w[j - 7] + s1;
      }

      let [a, b, c, d, e, f, g, h] = H;
      for (let j = 0; j < 64; j += 1) {
        let S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        let ch = (e & f) ^ (~e & g);
        let temp1 = h + S1 + ch + K[j] + w[j];
        let S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        let maj = (a & b) ^ (a & c) ^ (b & c);
        let temp2 = S0 + maj;

        h = g;
        g = f;
        f = e;
        e = d + temp1;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2;
      }

      H[0] += a;
      H[1] += b;
      H[2] += c;
      H[3] += d;
      H[4] += e;
      H[5] += f;
      H[6] += g;
      H[7] += h;
    }

    let numBytes = H.length * 4;
    let hash = new Uint8Array(numBytes);
    for (let i = 0; i < H.length; i += 1) {
      hash[i * 4] = (H[i] >>> 24) & 0xff;
      hash[i * 4 + 1] = (H[i] >>> 16) & 0xff;
      hash[i * 4 + 2] = (H[i] >>> 8) & 0xff;
      hash[i * 4 + 3] = H[i] & 0xff;
    }
    return hash;
  };

  // @ts-ignore
  window.Sha256 = Sha256;
})(("object" === typeof window && window) || {}, Sha256);
if ("object" === typeof module) {
  module.exports = Sha256;
}
