import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
// import order from "/models/order";
// import mongoose from "mongoose";

const Order = ({ subTotal, Order }) => {
  let router = useRouter();
  // console.log(router.query);
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>IndianCart | Order</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CodesWear.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #123456
              </h1>
              <p className="leading-relaxed mb-4">Order placed successfully!</p>
              <div className="flex mb-4">
                <a className="flex-grow py-2 text-lg px-1 text-center">
                  Item Name
                </a>
                <a className="flex-grow py-2 text-lg px-1 text-center">
                  Quantity
                </a>
                <a className="flex-grow py-2 text-lg px-1 text-center">
                  Sub Total 
                </a>
              </div>
              <div className="flex border-t border-gray-200 py-2 justify-between px-[2rem]">
                <div className="text-gray-900 w-5 text-center">
                  Wear the code(XL/BLUE)
                </div>
                <div className="text-gray-900 text-center">1</div>
                <div className="text-gray-900 text-center">₹499</div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal: {subTotal}
                </span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track Your order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     // checking if there already exists a connection
//     await mongoose.connect(process.env.MONGO_URI);
//   }
//   let order1 = await order.findById({ id: context.query.id });
//   let colorSizeSlug = {}; // {red: {xL:{slug:'wear-the-code-xl'}}}
//   return {
//     props: {
//       order1: JSON.parse(JSON.stringify(order1)),
//     },
//   };
// }

export default Order;
