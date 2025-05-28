//handling the connectivity between the backend and the database through connectivity string from mongoose
import mongoose from 'mongoose';

const connectDB = () => {   
    try{
        mongoose.connect("mongodb://localhost:27017/dkart")
        console.log("MongoDB connected successfully");
        
    }
    catch(err){
        console.error("MongoDB connection failed", err);
    }

}
export default connectDB;
