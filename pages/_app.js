import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import LoadingBar from "react-top-loading-bar";
import FullLayout from "../src/layouts/FullLayout";
import theme from "../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    // console.log("Hey");
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random());
    // on key change, navbar will be reloaded

    try {
      if (localStorage.getItem("cart"))
        setCart(JSON.parse(localStorage.getItem("cart")));
    } catch (e) {
      // console.log(e);
      localStorage.clear();
    }
    saveCart(JSON.parse(localStorage.getItem("cart")));
  }, [router.query]); // now the useEffect will run on every 'query'

  const logout = () => {
    localStorage.removeItem("myuser");
    router.push("/");
    setKey(Math.random());
    setUser({ value: null });
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    if (Object.keys(cart).length === 0) setKey(Math.random());
    let newCart = cart;
    if (itemCode in cart) newCart[itemCode].qty = cart[itemCode].qty + qty;
    else newCart[itemCode] = { qty: 1, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    // if (itemCode in cart) newCart[itemCode].qty = cart[itemCode].qty--;
    if (itemCode in cart) newCart[itemCode].qty = cart[itemCode].qty - qty;
    // if (newCart[itemCode]["qty"] <= 0) {
    // OR
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };
    saveCart({});
    setCart(newCart);
    saveCart(newCart);
    router.push("/Checkout");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    setKey(Math.random());
  };
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />

      {key && (
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      )}
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
        buyNow={buyNow}
        user={user}
      />

      <Footer />
    </>
  );
}

export default MyApp;
