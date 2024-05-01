const request = require('request');
const { expect } = require('chai');

describe('API test', () => {
  const URL = 'http://localhost:7865';

  it('GET /', (done) => {
    request(URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
