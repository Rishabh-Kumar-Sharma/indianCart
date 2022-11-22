import React, { useEffect } from "react";
import Order from "/models/order";
import mongoose from "mongoose";
import { useRouter } from "next/router";

const Orders = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="font-semibold text-center p-8 text-2xl">My Orders</h1>
        <div className="items">
          <table className="table-auto">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    // checking if there already exists a connection
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({});
  return {
    props: { orders: orders },
  };
}

export default Orders;
