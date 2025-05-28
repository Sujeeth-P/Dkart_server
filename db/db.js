//handling the connectivity between the backend and the database through connectivity string from mongoose
import mongoose from 'mongoose';

const connectDB = () => {   
    try{
        // mongodb://localhost:27017/dkart
        mongoose.connect("mongodb+srv://sujeeth9487:sujeeth@ecom.k3kfpyx.mongodb.net/?retryWrites=true&w=majority&appName=ecom/dkart")
        console.log("MongoDB connected successfully");
        
    }
    catch(err){
        console.error("MongoDB connection failed", err);
    }

}
export default connectDB;
