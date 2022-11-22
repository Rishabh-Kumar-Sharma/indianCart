import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
import jwt from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT);
    let dbuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.SECRET_KEY);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedPass === req.body.password) {
      dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.npassword,
            process.env.SECRET_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    } else
      res
        .status(200)
        .json({
          success: false,
          error: "Old and entered passwords do not match!",
        });
  } else res.status(400).json({ sucess: false, error: "Invalid request" });
};
export default connectDb(handler);
