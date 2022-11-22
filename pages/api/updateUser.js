import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT);
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        address: req.body.address,
        pincode: req.body.pincode,
        phone: req.body.phone,
        name: req.body.name,
      }
    );
    // let user = await User.find({ email: req.body.email });
    // console.log(user);
    res.status(200).json({ success: true });
  } else res.status(400).json({ sucess: false, error: "Invalid request" });
};
export default connectDb(handler);
