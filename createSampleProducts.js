import mongoose from "mongoose";
import Product from "./model/productModel.js";
import Admin from "./model/adminModel.js";
import dotenv from "dotenv";

dotenv.config();

const createSampleProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sujeeth9487:sujeeth@ecom.k3kfpyx.mongodb.net/dkart-test?retryWrites=true&w=majority&appName=ecom');
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      console.log('Admin user not found. Please create admin first.');
      process.exit(1);
    }

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log(`${existingProducts} products already exist in database`);
      process.exit(0);
    }

    // Sample products
    const sampleProducts = [
      {
        name: "iPhone 14 Pro Max",
        description: "Latest iPhone with A16 Bionic chip, 48MP camera system, and all-day battery life",
        price: 999.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        stock: 50,
        sku: "IPHONE14PM-001",
        tags: ["apple", "smartphone", "ios", "premium"],
        addedBy: admin._id
      },
      {
        name: "Samsung Galaxy S23 Ultra",
        description: "Premium Android smartphone with S Pen, 200MP camera, and 5000mAh battery",
        price: 899.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        stock: 35,
        sku: "SAMSUNG-S23U-001",
        tags: ["samsung", "android", "smartphone", "s-pen"],
        addedBy: admin._id
      },
      {
        name: "MacBook Pro 14-inch",
        description: "Apple MacBook Pro with M2 chip, 16GB RAM, and 512GB SSD",
        price: 1999.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        stock: 20,
        sku: "MACBOOK-PRO14-001",
        tags: ["apple", "laptop", "macbook", "m2"],
        addedBy: admin._id
      },
      {
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with Air Max technology and breathable mesh upper",
        price: 149.99,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        stock: 100,
        sku: "NIKE-AM270-001",
        tags: ["nike", "shoes", "running", "air-max"],
        addedBy: admin._id
      },
      {
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        stock: 75,
        sku: "HEADPHONES-BT-001",
        tags: ["headphones", "bluetooth", "wireless", "noise-cancelling"],
        addedBy: admin._id
      },
      {
        name: "Gaming Mechanical Keyboard",
        description: "RGB mechanical keyboard with Cherry MX switches for gaming enthusiasts",
        price: 129.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        stock: 60,
        sku: "KEYBOARD-GAMING-001",
        tags: ["gaming", "keyboard", "mechanical", "rgb"],
        addedBy: admin._id
      },
      {
        name: "Casual Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt available in multiple colors",
        price: 24.99,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        stock: 200,
        sku: "TSHIRT-COTTON-001",
        tags: ["clothing", "t-shirt", "cotton", "casual"],
        addedBy: admin._id
      },
      {
        name: "Stainless Steel Water Bottle",
        description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours",
        price: 29.99,
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        stock: 150,
        sku: "BOTTLE-STEEL-001",
        tags: ["water bottle", "stainless steel", "insulated", "eco-friendly"],
        addedBy: admin._id
      }
    ];

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} sample products created successfully!`);
    
    // Display created products
    const products = await Product.find().select('name price category stock');
    console.log('Created products:');
    products.forEach(product => {
      console.log(`- ${product.name} - $${product.price} (${product.category}) - Stock: ${product.stock}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating sample products:', error);
    process.exit(1);
  }
};

createSampleProducts();
