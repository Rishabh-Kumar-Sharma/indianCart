import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    // console.log(router.query.token);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const sendresetEmail = async (e) => {
    e.preventDefault();
    let data = { email, sendMail: true };
    // console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success)
      router.push(`${process.env.NEXT_PUBLIC_HOST}/Forgot?token=${res.token}`);
    else console.log(res.error);
  };

  const handleChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "cpassword") setCpassword(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      alert("Password can not be empty");
    } else {
      let data = {
        email: "rishabhkumarsharma2002@gmail.com",
        password,
        sendMail: false,
      };
      // console.log(data);
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed");
        setPassword("");
        setCpassword("");
        router.push("/");
      } else console.log(res.error);
    }
  };
  return (
    <>
      <Head>
        <title>IndianCart | Forgot Password</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href="/Login">
                <span className="font-medium text-pink-600 hover:text-pink-500 cursor-pointer">
                  {" "}
                  Login
                </span>
              </Link>
            </p>
          </div>
          {router.query.token && (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="relative mt-8 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label htmlFor="cpassword" className="sr-only">
                    Confirm New Password
                  </label>
                  <input
                    id="cpassword"
                    name="cpassword"
                    value={cpassword}
                    onChange={handleChange}
                    type="password"
                    autoComplete="email"
                    required
                    className="relative mt-8 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                    placeholder="Confirm New password"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={password !== cpassword}
                  onClick={resetPassword}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <span className="disabled:bg-pink-50 absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: mini/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
              {password !== cpassword && (
                <span className="text-red-500 text-sm">
                  Passwords do not match
                </span>
              )}
              {password === cpassword && password !== "" && (
                <span className="text-green-500 text-sm">Passwords match</span>
              )}
            </form>
          )}
          {!router.query.token && (
            <form className="mt-8 space-y-6" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    autoComplete="email"
                    required
                    className="relative mt-8 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                {/* <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Password"
                />
              </div> */}
              </div>

              <div>
                <button
                  onClick={sendresetEmail}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: mini/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Forgot;
