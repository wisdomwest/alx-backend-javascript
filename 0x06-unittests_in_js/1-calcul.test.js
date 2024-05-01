const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('type SUM', () => {
    it('should return the sum of two numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1, 3), 4);
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
      assert.strictEqual(calculateNumber('SUM', 1.5, 3.5), 6);
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.4), 5);
    });
  });
  describe('type SUBTRACT', () => {
    it('should return the subtraction of two numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1, 3), -2);
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
      assert.strictEqual(calculateNumber('SUBTRACT', 1.5, 3.5), -2);
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.4), -3);
      assert.strictEqual(calculateNumber('SUBTRACT', 2.4, 1.8), 0);
    });
  });
  describe('type DIVIDE', () => {
    it('should return the division of two numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1, 3), 0.3333333333333333);
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
      assert.strictEqual(calculateNumber('DIVIDE', 1.5, 3.5), 0.5);
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.4), 0.25);
    });
    it('should return Error when dividing by 0', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });
  });
});
