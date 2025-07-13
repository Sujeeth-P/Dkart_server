//handling the connectivity between the backend and the database through connectivity string from mongoose
import mongoose from 'mongoose';

const connectDB = () => {   
    try{
        // Using a clean test database to avoid index conflicts
        mongoose.connect("mongodb+srv://sujeeth9487:sujeeth@ecom.k3kfpyx.mongodb.net/dkart-test?retryWrites=true&w=majority&appName=ecom")
        console.log("MongoDB connected successfully");
        
    }
    catch(err){
        console.error("MongoDB connection failed", err);
    }

}
export default connectDB;
