import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB conneced'))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

export default connectDB;
