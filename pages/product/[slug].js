import React, { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Product from "../../models/Product";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import axios from "axios";
import { Store } from "../../utils/Store";

const ProductScreen = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
    }

    const itemExists = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert("No Stock Left");
    } else {
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
      router.push("/cart");
    }
  };
  return (
    <Layout title={product.name}>
      <div className="product-navigation">
        <div className="product-navigation-content">
          <NextLink href="/" passHref>
            <a>Back to Products</a>
          </NextLink>
        </div>
      </div>
      <div className="product">
        <div className="product-image">
          <div className="product-image-wrapper">
            <Image
              src={product.image}
              alt="product image"
              layout="responsive"
              width="350px"
              height="550px"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="product-details">
          <h4>{product.artist}</h4>
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          {product.countInStock > 0 ? (
            <button className="product-button" onClick={addToCartHandler}>
              Add to Cart
            </button>
          ) : (
            <button disabled className="product-button">
              Unavailable
            </button>
          )}
          <p>
            {product.countInStock > 0
              ? `${product.countInStock} in stock`
              : `out of stock`}
          </p>
          <h3>Product Description</h3>
          <p>{product.description}</p>
          <h3>
            {product.rating} ({product.numReviews} reviews)
          </h3>
        </div>
      </div>
      <div className="cart-summary"></div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
