import mongoose from "mongoose";

const uri =
  "mongodb+srv://username:password123456@cluster0.ycsni.mongodb.net/my-blog?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
