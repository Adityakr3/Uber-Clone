const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator')
module.exports.registerUser = async (req, res , next) => {
   const error = validationResult(req);
   if(!error.isEmpty()){
    return res.status(400).json({message : error.array()})
   }

   const {fullName, email, password} = req.body;
   const hashedPassword = await userModel.hashPassword(password);

   const user = await userService.createUser({
    firstName:fullName.firstName,
    lastName:fullName.lastName,
    email,
    password: hashedPassword
   })

   const token = user.generateAuthToken();
   res.status(201).json({message : "User created successfully", token , user});
} 