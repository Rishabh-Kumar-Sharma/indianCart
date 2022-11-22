import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        // console.log(req.body);
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT,
          { expiresIn: "2d" }
        );
        res.status(200).json({ 
          success: true,
          token,
          email: user.email,
        });
      } else
        res.status(200).json({ success: false, error: "Invalid Credentials!" });
    } else res.status(200).json({ success: false, error: "User not found!" });
  } else res.status(400).json({ error: "This method is not allowed" });
};
export default connectDb(handler);
