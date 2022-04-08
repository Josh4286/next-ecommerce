import { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : //JSON.parse converts a string into a javascript object
        [],
  },
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );
      //exist item is the item that already has an instance in the cart
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : /*if there is an item that already exist in the cart, we go through each item in the cart and replace the Existing item in the cart with the new version otherwise just use the new item*/
          [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      //filter means want to return elements that meet condition. We want to remove the element which has the same ID so we set a filter for elements with a different ID
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR": {
      Cookies.remove("cartItems");
      return { ...state, cart: { cartItems: [] } };
    }
    case "USER_LOGIN": {
      return { ...state, userInfo: action.payload };
    }
    case "USER_LOGOUT": {
      Cookies.remove("cartItems");
      Cookies.remove("userInfo");
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }
    default:
      return state;
  }
}

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    dispatch(initialState);
  }, []);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
