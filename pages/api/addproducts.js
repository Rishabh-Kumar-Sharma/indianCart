import Product from "../../models/product";
import connectDb from "../../middleware/mongoose";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        img: req.body[i].img,
        desc: req.body[i].desc,
        price: req.body[i].price,
        size: req.body[i].size,
        color: req.body[i].color,
        availableQty: req.body[i].availableQty,
        category: req.body[i].category,
      });
      await p.save();
    }
    res.status(200).json({Success:"Data added successfully"})
  } else res.status(400).json({ error: "This method is not allowed" });
};
export default connectDb(handler);
