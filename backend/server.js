import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
const app = express();
dotenv.config();

connectDB();
const port = process.env.PORT || 3005;
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
