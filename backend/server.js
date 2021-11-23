import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
const app = express();
dotenv.config();

connectDB();
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`.yellow.underline.bold
  );
});
