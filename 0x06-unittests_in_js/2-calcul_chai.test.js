const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('type SUM', () => {
    it('should return the sum of two numbers', () => {
      expect(calculateNumber('SUM', 1, 3)).to.equal(4);
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
      expect(calculateNumber('SUM', 1.5, 3.5)).to.equal(6);
      expect(calculateNumber('SUM', 1.4, 4.4)).to.equal(5);
    });
  });
  describe('type SUBTRACT', () => {
    it('should return the subtraction of two numbers', () => {
      expect(calculateNumber('SUBTRACT', 1, 3)).to.equal(-2);
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
      expect(calculateNumber('SUBTRACT', 1.5, 3.5)).to.equal(-2);
      expect(calculateNumber('SUBTRACT', 1.4, 4.4)).to.equal(-3);
      expect(calculateNumber('SUBTRACT', 2.4, 1.8)).to.equal(0);
    });
  });
  describe('type DIVIDE', () => {
    it('should return the division of two numbers', () => {
      expect(calculateNumber('DIVIDE', 1, 3)).to.equal(0.3333333333333333);
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
      expect(calculateNumber('DIVIDE', 1.5, 3.5)).to.equal(0.5);
      expect(calculateNumber('DIVIDE', 1.4, 4.4)).to.equal(0.25);
    });
    it('should return Error when dividing by 0', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });
});
