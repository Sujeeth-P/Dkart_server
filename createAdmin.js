import mongoose from "mongoose";
import Admin from "./model/adminModel.js";
import dotenv from "dotenv";

dotenv.config();

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sujeeth9487:sujeeth@ecom.k3kfpyx.mongodb.net/dkart-test?retryWrites=true&w=majority&appName=ecom');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create initial admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@dkart.com',
      password: 'admin123',
      role: 'super-admin',
      permissions: {
        canAddProducts: true,
        canEditProducts: true,
        canDeleteProducts: true,
        canViewStats: true
      }
    });

    await admin.save();
    console.log('Initial admin created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@dkart.com');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating initial admin:', error);
    process.exit(1);
  }
};

createInitialAdmin();
