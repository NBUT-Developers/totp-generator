# @deathmoon/totp-generator

[![Build Status](https://travis-ci.org/nbut-developers/totp-generator.svg?branch=master)](https://travis-ci.org/nbut-developers/totp-generator)
[![Code Climate](https://codeclimate.com/github/NBUT-Developers/totp-generator/badges/gpa.svg)](https://codeclimate.com/github/NBUT-Developers/totp-generator)
[![Test Coverage](https://codeclimate.com/github/NBUT-Developers/totp-generator/badges/coverage.svg)](https://codeclimate.com/github/NBUT-Developers/totp-generator/coverage)
[![npm Version](https://img.shields.io/npm/v/deathmoon-totp-generator.svg)](https://www.npmjs.com/package/deathmoon-totp-generator)

totp-generator lets you generate TOTP tokens from a TOTP key.

> This package is based on [bellstrand](https://github.com/bellstrand)'s [totp-generator](https://github.com/bellstrand/totp-generator).

## How to use

```javascript
var totp = require('@deathmoon/totp-generator');

var token = totp('JBSWY3DPEHPK3PXP', { time: new Date() });

console.log(token); // prints a 6 digit time base token based on inputed key and time
```

### API

```javascript
totp(<key>, [opts])
```

+ `key` (`string`): the secret key;
+ `opts` (`Object`): the options object;
    - `opts.time` (`number`): the timestamp, defaults to `Date.now()`.

## Works with these token requirements

- SHA-1
- 30 sec epoch interval
- 6 digit tokens

## What do I use this library for?

- E2E tests (where you need to login with 2-factor authentication)
