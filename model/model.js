import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// Order Schema
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: { type: String, default: 'COD' },
  orderDate: { type: Date, default: Date.now }
});

const SignupSchema = new mongoose.Schema({
  name: {type: String,require: true},
  email: {type: String,require: true},
  password: {type: String,require: true},
  orders: [OrderSchema] // Embed orders in user document
})


//pass encry
SignupSchema.pre("save", async function(next) {
  if ((!this.isModified("password"))) return next()
  const salt = await bcrypt.genSalt(10); 
  this.password = await bcrypt.hash(this.password, salt)
  next();
});

//pass will be matched
SignupSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
} 



const SignupCollection = mongoose.model("signups", SignupSchema)


// const LoginSchema = new mongoose.Schema({
//   email: {type: String,require: true},
//   password: {type: String,require: true}
// })

// const LoginCollection = mongoose.model("logins", LoginSchema)

export default SignupCollection