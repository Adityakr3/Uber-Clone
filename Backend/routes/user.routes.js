const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invaild Mail'),
    body('fullName.firstName').isLength({min:5}).withMessage('FirstName is too short'),
    body('password').isLength({min:8}).withMessage('password is too short'),
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Invaild Mail'),
    body('password').isLength({min:8}).withMessage('password is too short'),
],userController.loginUser)



module.exports = router