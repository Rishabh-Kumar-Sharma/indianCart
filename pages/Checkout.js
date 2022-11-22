import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Router, useRouter } from "next/router";
import Head from "next/head";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (user && user.token) {
      setEmail(user.email);
      setUser(user);
      fetchData(user.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    // console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setName(res.name);
    setEmail(res.email);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
    getPincode(res.pincode);
  };
  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1]);
      setCity(pinJson[pin][0]);
    } else {
      setState("");
      setCity("");
    }
  };
  const handleChange = async (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "phone") setPhone(e.target.value);
    else if (e.target.name === "address") setAddress(e.target.value);
    else if (e.target.name === "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value);
      } else {
        setState("");
        setCity("");
      }
    }
  };
  const Checker = () => {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      pincode === "" ||
      address === ""
    )
      return true;
    return false;
  };
  return (
    <>
      <Head>
        <title>IndianCart | Checkout</title>
      </Head>
      <div className="container m-auto">
        <h1 className="font-bold text-xl text-center my-4">Checkout</h1>
        <h2 className="font-semibold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              {user && user.token ? (
                <input
                  type="email"
                  value={user.email}
                  id="email"
                  name="email"
                  readOnly
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
                 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                <input
                  type="email"
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
                 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="address"
              onChange={handleChange}
              value={address}
              id="address"
              cols="30"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                type="phone"
                onChange={handleChange}
                value={phone}
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                onChange={handleChange}
                value={pincode}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={handleChange}
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={city}
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
        <div className="sideCart bg-pink-50 p-6 m-2">
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-3 font-normal">No items in the cart</div>
            )}
            {Object.keys(cart).map((k) => {
              // console.log(k)
              return (
                <li key={k}>
                  <div className="item flex">
                    <div className="w-3/5">
                      {cart[k].name}({cart[k].size},{cart[k].variant})
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="mx-2 text-sm cursor-pointer">
                        <AiOutlineMinusCircle
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                        />
                      </div>
                      {cart[k].qty}
                      <div className="mx-2 text-sm cursor-pointer">
                        <AiOutlinePlusCircle
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold">Subtotal:{subTotal}</div>
          {subTotal !== 0 && (
            <button
              onClick={() => {
                router.push("/Order");
              }}
              disabled={Checker() ? true : false}
              className="disabled:bg-pink-300 mt-[2rem] absolute left-[50%] text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Pay ₹{subTotal} Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
