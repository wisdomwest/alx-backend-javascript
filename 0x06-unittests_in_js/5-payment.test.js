const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    spy.restore();
  });

  it('should log correct output when the promise is resolved', () => {
    sendPaymentRequestToApi(100, 20);
    expect(spy.calledOnceWith('The total is: 120')).to.be.true;
  });

  it('should log correct output when the promise is rejected', () => {
    sendPaymentRequestToApi(10, 10);
    expect(spy.calledOnceWith('The total is: 20')).to.be.true;
  });
});
