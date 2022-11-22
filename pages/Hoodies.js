import Head from "next/head";
import React from "react";
import Link from "next/link";
import Product from "../models/product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
  // console.log(products);
  return (
    <div>
      <Head>
        <title>IndianCart | Hoodies</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center justify-center">
            {/* {products.map((item) => { */}
            {/* The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same 
            order that a normal loop would. */}
            {Object.keys(products).length===0 && <p>Sorry, Hoodies are currently out of stock... </p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-1/5 text-center md:w-1/2 p-4 text-center w-full shadow-lg m-2 cursor-pointer">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto h-[30vh] md:h-[36vh] block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Hoodies
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1 md:text-center">
                        {products[item].size.includes("S") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1 md:text-center">
                        {products[item].color.includes('Red') && (
                          <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes('Blue') && (
                          <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes('Black') && (
                          <button className="border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes('Green') && (
                          <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    // checking if there already exists a connection
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "hoodies" });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) }, // will be passed to the page component as props
  };
}

export default Hoodies;
