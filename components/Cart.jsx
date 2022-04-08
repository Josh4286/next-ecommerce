import Image from "next/image";
import NextLink from "next/link";
import axios from "axios";

const Cart = ({ cartItems, dispatch }) => {
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
    }
    quantity = parseInt(quantity);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.slug} className="cart-card">
          <div className="cart-card-image">
            <NextLink href={`/product/${item.slug}`} passHref>
              <a>
                <Image
                  src={item.image}
                  alt="product image"
                  layout="responsive"
                  width="350px"
                  height="550px"
                  objectFit="cover"
                ></Image>
              </a>
            </NextLink>
          </div>
          <div className="cart-card-content">
            <div className="details">
              <h6>{item.artist}</h6>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>

            <div className="cart-card-content-action">
              <div className="cart-select">
                <label htmlFor="quantity">Qty</label>
                <select
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => updateCartHandler(item, e.target.value)}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={() => removeItemHandler(item)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
