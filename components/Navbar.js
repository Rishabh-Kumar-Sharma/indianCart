import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
// import { FaBeer  } from 'react-icons/fa'; // note: 'fa' for 'Fa'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
// import { borderRadius } from "@mui/system";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const toggleCart = () => {
    //old logic :-
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }

    // new logic :-
    setSidebar(!sidebar);
    // console.log("toggleCart activated "+sidebar)
  };
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(cart).length !== 0) setSidebar(true);
    // console.log(sidebar);
    // console.log(router);
    let exempted = ["/Checkout", "/Order", "/Orders", "/MyAccount"];
    if (exempted.includes(router.pathname)) setSidebar(false);
  }, []);

  const ref = useRef(); // as the name suggests, it's used to 'refer' to an element
  return (
    <>
      {!sidebar && (
        <span
          className="fixed top-3 right-5 z-30 md:right-6"
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="z-30 absolute right-5 md:right-5 bg-pink-400 top-5 md:top-6 rounded-md px-5 w-[148px] font-bold"
            >
              <ul>
                <Link href="/MyAccount">
                  <li className="cursor-pointer py-1 hover:text-white text-sm">
                    My Account
                  </li>
                </Link>
                <Link href="/Orders">
                  <li className="cursor-pointer py-1 hover:text-white text-sm">
                    Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="cursor-pointer py-1 hover:text-white text-sm"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="cursor-pointer text-xl md:text-xl mr-2 mt-[5px]" />
          )}
        </span>
      )}
      <div
        className={`sticky top-0 bg-gray-300 z-10 flex flex-col md:flex-row md:justify-start justify-center items-center py-1 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mx-5">
          <Link href="/">
            <a>
              <Image
                src="/IndianCart.jpg"
                style={{ borderRadius: "25%" }}
                width={50}
                height={50}
                alt=""
              ></Image>
            </a>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-2 font-bold text-sm">
            <Link href="/Tshirts">
              <a>
                <li>T-Shirts</li>
              </a>
            </Link>
            <Link href="/Hoodies">
              <a>
                <li>Hoodies</li>
              </a>
            </Link>
            <Link href="/Stickers">
              <a>
                <li>Stickers</li>
              </a>
            </Link>
            <Link href="/Mugs">
              <a>
                <li>Mugs</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="flex cart absolute right-1 top-4 cursor-pointer items-center">
          {!user.value && (
            <Link href="/Login">
              <a>
                <button className="bg-pink-500 text-white px-2 py-1 rounded-md text-sm mx-3">
                  Login
                </button>
              </a>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-xl"
          />
        </div>

        <div
          ref={ref}
          className={`h-[100vh] w-72 overflow-y-scroll p-10 top-0 absolute bg-pink-50 transition-all ${
            sidebar ? "right-0" : "-right-96"
          }`}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span className="absolute top-1 right-1 font-bold cursor-pointer text-xl text-pink-500">
            <AiOutlineClose onClick={toggleCart} />
          </span>
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
                      {cart[k].name}({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex items-center justify-center w-2/5">
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
          <div className="font-bold text-center">Subtotal:{subTotal}</div>

          <div className="flex justify-center">
            {subTotal !== 0 && (
              <Link href={"/Checkout"}>
                <button
                  onClick={toggleCart}
                  className="flex mx-2 mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  <div className="px-1 my-auto">
                    <BsFillBagCheckFill />
                  </div>
                  <p className="my-auto">Checkout</p>
                </button>
              </Link>
            )}
            {Object.keys(cart).length !== 0 && (
              <button
                onClick={clearCart}
                className="flex mx-2 mt-16 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
