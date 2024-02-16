const http = require('http');
const fs = require('fs');

const dataJson = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(dataJson);
console.log(dataObj);

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.end('OVERVIEW');
      break;

    case 'overview':
      res.end('OVERVIEW');
      break;

    case '/product':
      res.end('PRODUCT');
      break;

    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(dataJson);

      break;

    default:
      res.writeHead(404, {
        'content-type': 'text/html',
      });
      res.end('<h1>PAGE NOT FOUND</h1>');
      break;
  }
});

server.listen(8000, '127.0.0.1', (req, res) => {
  console.log('>> Server running on port 8000');
});
