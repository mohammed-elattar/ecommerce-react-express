const express = require('express');
const app = express();
const port = 3005;
const products = require('./data/products');

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
