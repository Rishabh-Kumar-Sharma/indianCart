import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [user, setUser] = useState({ value: null });

  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (!user) {
      router.push("/");
    }
    if (user && user.token) {
      setEmail(user.email);
      setUser(user);
      // console.log(user.token)
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
  };

  const handleChange = async (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "phone") setPhone(e.target.value);
    else if (e.target.name === "address") setAddress(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "cpassword") setCpassword(e.target.value);
    else if (e.target.name === "npassword") setNpassword(e.target.value);
    else if (e.target.name === "pincode") {
      setPincode(e.target.value);

      // if (e.target.value.length == 6) {
      //   let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      //   let pinJson = await pins.json();
      //   if (Object.keys(pinJson).includes(e.target.value)) {
      //     setState(pinJson[e.target.value][1]);
      //     setCity(pinJson[e.target.value][0]);
      //   } else {
      //     setState("");
      //     setCity("");
      //   }
      // } else {
      //   setState("");
      //   setCity("");
      // }
    }
  };
  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    console.log(res);
  };

  const handlePassword = async () => {
    if (npassword === cpassword) {
      let data = { token: user.token, password, npassword };
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let res = await a.json();
      if (!res.success) alert(res.error);
      setPassword("");
      setNpassword("");
      setCpassword("");
    } else alert("New password and Confirmed Password do not match!");
  };
  return (
    <>
      <Head>
        <title>IndianCart | My Account</title>
      </Head>
      <div className="container mx-auto my-9">
        <h1 className="text-xl text-center font-bold">Update your Account</h1>
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
        <button
          onClick={handleUserSubmit}
          className="disabled:bg-pink-300 m-2 mb-5 absolute left-[50vw] text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Save
        </button>
      </div>
      {/* <div className="mx-auto flex">
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
        </div> */}
      <div className="container mx-auto my-[5.3rem]">
        <h2 className="font-semibold text-xl">2. Change Password</h2>
        <div className="mx-auto flex">
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Old Password
              </label>
              <input
                value={password}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="npassword"
                className="leading-7 text-sm text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                value={npassword}
                onChange={handleChange}
                id="npassword"
                name="npassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
                 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={cpassword}
                onChange={handleChange}
                id="cpassword"
                name="cpassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2
                 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handlePassword}
          className="disabled:bg-pink-300 m-2 absolute left-[50vw] text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default MyAccount;
