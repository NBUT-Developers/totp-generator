'use strict';

const totp = require('../index');

describe('totp generation', () => {
  it('should generate token with time = 1971', () => {
    expect(totp('JBSWY3DPEHPK3PXP', { time: 0 })).toEqual('282760');
  });

  it('should generate token with time = 2016', () => {
    expect(totp('JBSWY3DPEHPK3PXP', { time: 1465324707000 })).toEqual('341128');
  });

  it('should generate token time with a leading zero', () => {
    expect(totp('JBSWY3DPEHPK3PXP', { time: 1365324707000 })).toEqual('089029');
  });

  it('should generate token with date now = 1971', () => {
    global.Date.now = () => { return 0; };
    expect(totp('JBSWY3DPEHPK3PXP')).toEqual('282760');
  });

  it('should generate token with date now = 2016', () => {
    global.Date.now = () => { return 1465324707000; };
    expect(totp('JBSWY3DPEHPK3PXP')).toEqual('341128');
  });

  it('should generate token with a leading zero', () => {
    global.Date.now = () => { return 1365324707000; };
    expect(totp('JBSWY3DPEHPK3PXP')).toEqual('089029');
  });
});
