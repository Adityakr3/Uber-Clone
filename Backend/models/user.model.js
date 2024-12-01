const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlenght: [3, "firstName must be at least 3 characters"],
    },
    lastName: {
      type: String,
      minlenght: [3, "lastName must be at least 3 characters"],
    },
  },
  email:{
    type: String,
    required:true,
    unique:true,
    minlenght: [3, "email must be at least 3 characters"],
  },
  password:{
    type: String,
    required:true,
    select:false,
  },
  socketId:{
     type:String
  }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user' , userSchema)
module.exports = userModel

