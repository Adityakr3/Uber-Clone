const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstName , lastName , email , password
}) => {
    if(!firstName || !email || !password){
        throw new Error('Please provide all the details');
    }
    const user  = userModel.create({
        fullName:{
            firstName , 
            lastName 
        },
         email ,
         password
    })
     
    return user;
}