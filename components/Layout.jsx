import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Store } from "../utils/Store";

const Layout = ({ title, children }) => {
  const { state } = useContext(Store);
  const { darkMode } = state;
  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty(
        "--dark-background-colour",
        "#141414"
      );
      document.documentElement.style.setProperty(
        "--dark-font-colour",
        "#fafafa"
      );
      document.documentElement.style.setProperty(
        "--dark-card-colour",
        "#313131"
      );
      document.documentElement.style.setProperty(
        "--dark-product-navigation",
        "#313131"
      );
    } else {
      document.documentElement.style.setProperty(
        "--dark-background-colour",
        "#fafafa"
      );
      document.documentElement.style.setProperty(
        "--dark-font-colour",
        "#000000"
      );
      document.documentElement.style.setProperty(
        "--dark-card-colour",
        "#fafafa"
      );
      document.documentElement.style.setProperty(
        "--dark-product-navigation",
        "#eeeeee"
      );
    }
  }, [darkMode]);

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Artistic` : `Artistic`}</title>
      </Head>
      <Navbar />
      <div className="content">
        <div className="content-wrapper"> {children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
