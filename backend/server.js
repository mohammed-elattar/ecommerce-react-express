import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
const app = express();
dotenv.config();
app.use(express.json());
connectDB();
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`.yellow.underline.bold
  );
});
