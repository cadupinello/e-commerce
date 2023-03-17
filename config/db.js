import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgBlue.bold);
  } catch (error) {
    console.log(`error in Mongodb ${error}`.bgRed.white);
  }
}

export default connectDB;