import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT);
    let dbuser = await User.findOne({ email: user.email });
    const { name, email, address, pincode, phone } = dbuser;
    // console.log(dbuser);
    // let user = await User.find({ email: req.body.email });
    // console.log(user);
    res.status(200).json({ name, email, address, pincode, phone });
  } else res.status(400).json({ error: "Invalid request" });
};
export default connectDb(handler);
