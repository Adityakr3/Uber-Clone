const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
router.post('/register',userController.registerUser)


router.post('/login',userController.loginUser)
router.get('/profile', authMiddleware.authUser,  userController.getUserProfile);
router.get('/logout' , authMiddleware.authUser,userController.logoutUser)

module.exports = router  