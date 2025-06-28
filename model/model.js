import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const SignupSchema = new mongoose.Schema({
  name: {type: String,require: true},
  email: {type: String,require: true},
  password: {type: String,require: true}
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