import React, { useContext } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Store } from "../utils/Store";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

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
    <div className="product-card">
      <NextLink href={`/product/${product.slug}`} passHref>
        <a>
          <div className="product-card-image-wrapper">
            <Image
              src={product.image}
              alt="product image"
              layout="fill"
              objectFit="cover"
            ></Image>
          </div>
        </a>
      </NextLink>

      <div className="product-card-content">
        <NextLink href={`/product/${product.slug}`} passHref>
          <a>
            <div>
              <h4>{product.name}</h4>
              <h4>${product.price}</h4>
            </div>
          </a>
        </NextLink>
        {product.countInStock > 0 ? (
          <button className="product-card-button" onClick={addToCartHandler}>
            + Add to Cart
          </button>
        ) : (
          <button disabled className="product-card-button">
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
