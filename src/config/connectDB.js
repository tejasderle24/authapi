import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`\n MongoDB Conneted !! ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.error("MongoDB connection Error");
    process.exit(1) 
  }
}

export default connectDB;