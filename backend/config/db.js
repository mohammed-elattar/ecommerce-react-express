import mongoose from 'mongoose';
import colors from 'colors';
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB conneced'.cyan.underline))
    .catch((err) => {
      console.error(`${err.message}`.red.underline.bold);
      process.exit(1);
    });
};

export default connectDB;
