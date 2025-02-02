const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator')
const BlacklistedTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res , next) => {
   try{
      const error = validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({message : error.array()})
   }

   const {fullName, email, password} = req.body;


   const isUserAlreadyExist = await userModel.findOne({email});
   if(isUserAlreadyExist){
      return res.status(400).json({message : "User already exist"}) 
   }
   const hashedPassword = await userModel.hashPassword(password);

   const user = await userService.createUser({
    firstName:fullName.firstName,
    lastName:fullName.lastName,
    email,
    password: hashedPassword
   })

   const token = user.generateAuthToken();
   res.status(201).json({message : "User created successfully", token , user});
   }catch(error){
      res.status(500).json({
         success: false,
         message: error.message
     });
   }
} 

module.exports.loginUser = async (req, res , next) => {
   const error = validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({message : error.array()})
   }
   const {email, password} = req.body;
   const user = await userModel.findOne({email}).select('+password');
   if(!user){
    return res.status(401).json({message : "Invalid Email or Password"})
   }

   const isMatch = await user.comparePassword(password);
   if(!isMatch){
      return res.status(401).json({message : "Invalid Email or Password"})
   }

   const token = user.generateAuthToken();

   res.cookie('token' , token)
   res.status(200).json({message : "User logged in successfully", token , user});
}

module.exports.getUserProfile = async (req, res , next) => {
   res.status(200).json(req.user);
}

module.exports.logoutUser = async(req , res , next) => {
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
   res.status(200).json({message : "User logged out successfully"});
}
