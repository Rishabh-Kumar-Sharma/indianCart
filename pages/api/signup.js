import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    // secret123 is a secret key
    });
    await u.save();
    // console.log(req.body);
    res.status(200).json({ Success: "Data added successfully" });
  } else res.status(400).json({ error: "This method is not allowed" });
};
export default connectDb(handler);
