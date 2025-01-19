const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
module.exports.reCaptchaVerify = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ success: false, message: "No captcha token provided" });
  }
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const { success } = response.data;
    if (success) {
      return res.json({
        success: true,
        message: "Captcha verified successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Captcha verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
