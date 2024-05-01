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

  it('GET /cart/12', (done) => {
    request(`${URL}/cart/12`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('GET /cart/hello', (done) => {
    request(`${URL}/cart/hello`, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('GET /available_payments', (done) => {
    request(`${URL}/available_payments`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('{"payment_methods":{"credit_cards":true,"paypal":false}}');
      done();
    });
  });

  if ('POST /login', (done) => {
    request.post(`${URL}/login`, { json: { userName: 'Betty' } }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome Betty');
      done();
    });
  });
});
