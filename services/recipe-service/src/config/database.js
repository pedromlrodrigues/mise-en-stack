import mongoose from 'mongoose';
import 'dotenv/config'; // Loads variables from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully. ✅');
  } catch (error) {
    console.error('MongoDB connection failed: ❌', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
