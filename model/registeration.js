import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const registerSchema = mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type:String},
    role:{type:String,enum: ["ADMIN", "STUDENT"], default:"ADMIN",}
})

registerSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt) ;
})

registerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

const Register = mongoose.model("register",registerSchema);

export default Register;