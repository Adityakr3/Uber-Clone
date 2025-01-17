const express = require('express');
const router = express.Router();
const recaptchaController = require('../controllers/recaptcha.controller');

router.post('/verify', (req,res)=>{
    recaptchaController.reCaptchaVerify(req,res)
});

module.exports = router;