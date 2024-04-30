const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

const app = http.createServer();

app.on('request', (_, res) => {
  const data = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', data.length);
  res.statusCode = 200;
  res.write(Buffer.from(data));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});

module.exports = app;
