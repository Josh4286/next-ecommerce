import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Toggle from "./Toggle";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
const SearchBar = () => {
  return (
    <div className="navbar-search-wrapper">
      <input className="navbar-search-input" placeholder="Search"></input>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const [clientDarkMode, setClientDarkMode] = useState(false);
  const [clientCart, setClientCart] = useState(false);
  const [clientUserInfo, setClientUserInfo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //used useEffects to hydrate the client otherwise there will be console warning for server and client not matching
  useEffect(() => {
    if (darkMode) {
      setClientDarkMode(true);
    } else {
      setClientDarkMode(false);
    }
  }, [darkMode]);

  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setClientCart(true);
    } else {
      setClientCart(false);
    }
  }, [cart]);

  useEffect(() => {
    if (userInfo) {
      setClientUserInfo(true);
    } else {
      setClientUserInfo(false);
    }
  }, [userInfo]);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    setClientDarkMode(!clientDarkMode);
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setClientUserInfo(false);
    router.push("/");
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <NextLink href="/" passHref>
          <a>
            <h1>Artistic</h1>
          </a>
        </NextLink>
        {/* <SearchBar /> */}
        {/* <Toggle /> */}
        <div className="navbar-content-wrapper">
          <button onClick={darkModeChangeHandler}>
            {clientDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {clientUserInfo ? (
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => handleOpen()}>
                {userInfo.name}
              </button>
              {isOpen ? (
                <div className="dropdown-content">
                  <h3
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    Profile
                  </h3>
                  <h3
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    Orders
                  </h3>
                  <h3
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </h3>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <NextLink href="/login" passHref>
              <a>
                <h2>Login</h2>
              </a>
            </NextLink>
          )}

          <NextLink href="/cart" passHref>
            <a className="cart">
              {clientCart && (
                <div className="cart-badge">
                  {cart.cartItems.length > 0 && (
                    <>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</>
                  )}
                </div>
              )}
              <h2>Cart</h2>
            </a>
          </NextLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
