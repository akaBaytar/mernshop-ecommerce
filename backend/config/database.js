import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MangoDB connected. ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
