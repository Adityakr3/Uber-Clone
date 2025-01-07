const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captionSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      require: true,
      minLenght: [3, "firstName must be at least 3 char"],
    },
    lastName: {
      type: String,
      minLenght: [3, "firstName must be at least 3 char"],
    },
  },
  email: {
    type: string,
    require: true,
    unique: true,
    lowercase: true,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "enter a vaild email",
    ],
  },
  password:{
    type:string,
    require:true,
    select:false
  },
  socketId:{
    type:String
 },

 status:{
    type:string,
    enum:['active','inactive'],
    default:'inactive'
 },
 vehicle:{
    color:{
        type:String,
        require:true,
        minLenght:[3,'color must be at least 3 characters long']
    },
    plate:{
        type:String,
        require:true,
        minLenght:[3,'plate must be at least 3 characters long'] 
    },
    capacity:{
        type: Number,
        require:true,
        minLenght:[1,'capacity must be at least 1'] 
    },
    vehicleType:{
        type:String,
        require:true,
        enum:['car','motorcycle','auto']
    }
 },
 location:{
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }
 }

});

captionSchema.methods.generateAuthToken = function(){
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY , {expiresIn:'24h'})
        return token;
}

captionSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

captionSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const captionModel = mongoose.model('caption',captionSchema)

module.export = captionModel