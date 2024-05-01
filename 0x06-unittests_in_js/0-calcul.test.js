const assert = require('assert');
const calculateNumber = require('./0-calcul.js');

describe('calculateNumber', () => {
  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(1.5, 3), 5);
  });

  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(1.4, 3.5), 5);
  });

  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(1.4, 3.4), 4);
  });

  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });

  it('should round a and b and return the sum', () => {
    assert.strictEqual(calculateNumber(0, 0.1), 0);
  });
});
