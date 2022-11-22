// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/forgot";
import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
import jwt from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (req.body.sendMail) {
    if (req.method === "POST") {
      // console.log(user.name);

      if (user) {
        // Check if the user exists in the Database
        let token = jwt.sign(
          { email: user.email },
          process.env.JWT,
          { expiresIn: "2d" }
        );
        let forgot = new Forgot({
          email: req.body.email,
          token: token,
        });
        await forgot.save();

        // Send an email to the user

        //       let email_message = `
        // We have sent you this email in response to your request to reset your password on Codeswear.com.

        // <br/><br/>

        // To reset your password, please follow the link below:

        // <a href="http://localhost:3000/Forgot?token=${token}">
        //   Click here to reset your password
        // </a>;

        // <br/><br/>

        // We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your "My Account" Page and change your password.
        // `;

        res.status(200).json({ success: true, token: token });
      } else res.status(200).json({ success: false, error: "User not found!" });
    } else
      res
        .status(400)
        .json({ success: false, error: "This method is not allowed" });
  } else {
    // Reset User password
    if (req.method === "POST") {
      if (user) {
        await User.findOneAndUpdate(
          { email: req.body.email },
          {
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString(),
          }
        );
        res.status(200).json({ success: true });
      } else res.status(200).json({ success: false, error: "User not found!" });
    } else
      res
        .status(400)
        .json({ success: false, error: "This method is not allowed" });
  }
};
export default connectDb(handler);
