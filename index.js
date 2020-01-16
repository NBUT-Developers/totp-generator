'use strict';

const JsSHA = require('jssha');

function hexToDec(s) {
  return parseInt(s, 16);
}

function decToHex(s) {
  return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

function base32ToHex(base32) {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let hex = '';

  for (let i = 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += leftpad(val.toString(2), 5, '0');
  }

  for (let i = 0; i + 4 <= bits.length; i += 4) {
    const chunk = bits.substr(i, 4);
    hex = hex + parseInt(chunk, 2).toString(16);
  }

  return hex;
}

function leftpad(str, len, pad) {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join(pad) + str;
  }
  return str;
}

module.exports = function getToken(key, opts = {}) {
  opts = Object.assign({}, { time: Date.now() }, opts);

  key = base32ToHex(key);
  const epoch = Math.round(opts.time / 1000.0);
  const time = leftpad(decToHex(Math.floor(epoch / 30)), 16, '0');
  const shaObj = new JsSHA('SHA-1', 'HEX');
  shaObj.setHMACKey(key, 'HEX');
  shaObj.update(time);

  const hmac = shaObj.getHMAC('HEX');
  const offset = hexToDec(hmac.substring(hmac.length - 1));

  // eslint-disable-next-line
  let otp = (hexToDec(hmac.substr(offset * 2, 8)) & hexToDec('7fffffff')) + '';
  otp = otp.substr(otp.length - 6, 6);

  return otp;
};

module.exports.base32ToHex = base32ToHex;
