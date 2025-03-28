import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default dbConnect;
