const http = require('http');
const fs = require('fs');
const url = require('url');

const dataJson = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(dataJson);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case '/':
      const cardsHtml = dataObj
        .map(item => replaceTemplate(cardTemplate, item))
        .join('');
      const displayCards = overviewTemplate.replace(
        '{%PRODUCT_CARDS%}',
        cardsHtml
      );

      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(displayCards);
      break;

    case '/overview':
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(overviewTemplate);
      break;

    case '/product':
      const product = dataObj[query.id];
      const displayProduct = replaceTemplate(productTemplate, product);

      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(displayProduct);
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

function replaceTemplate(template, product) {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}
