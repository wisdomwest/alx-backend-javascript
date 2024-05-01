const getPaymentTokenFromAPI = (success) => new Promise((reslove, reject) => {
  if (success) {
    reslove({data: 'Successful response from the API' });
  }
});

module.exports = getPaymentTokenFromAPI;
