import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Delivery from "../components/Delivery";
import Payment from "../components/Payment";
import CartComponent from "../components/Cart";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import {
  PayPalButtons,
  PayPalHostedFieldsProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { getError } from "../utils/error";

const Cart = () => {
  const router = useRouter();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const defaultValues = {
    paymentMethod: "card",
  };
  const price = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const [loading, setLoading] = useState(false);
  const methods = useForm({ mode: "onTouched", defaultValues });
  const {
    handleSubmit,
    watch,
    getValues,
    formState: { isDirty, isValid },
  } = methods;
  const watchPaymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (userInfo) {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "AUD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [userInfo]);

  const submitHandler = async ({
    name,
    address,
    number,
    paymentMethod,
    card,
  }) => {
    try {
      alert(
        `name: ${name}, address: ${address}, number: ${number}, payment method: ${paymentMethod}, card: ${card}, price: ${price}`
      );
      setLoading(true);

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: address,
          paymentMethod,
          totalPrice: price,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "CART_CLEAR" });
      // Cookies.remove('cartItems')
      setLoading(false);
      router.push(`/orders/${data._id}`);
    } catch (err) {
      setLoading(false);
      alert(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  const loginHandler = () => {
    router.push("/login?redirect=/cart");
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: price,
              currency_code: "AUD",
              breakdown: {
                item_total: {
                  currency_code: "AUD",
                  value: price,
                },
              },
            },
            items: cartItems.map((item) => ({
              name: item.name,
              description: item.name,
              unit_amount: {
                currency_code: "AUD",
                value: item.price,
              },
              quantity: item.quantity,
            })),
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      const name = getValues("name");
      const address = getValues("address");
      const number = getValues("number");
      const paymentMethod = getValues("paymentMethod");
      const card = getValues("card");
      try {
        setLoading(true);

        const { data } = await axios.post(
          "/api/orders",
          {
            orderItems: cartItems,
            shippingAddress: address,
            paymentMethod,
            totalPrice: price,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        dispatch({ type: "CART_CLEAR" });
        // Cookies.remove('cartItems')
        setLoading(false);
        router.push(`/orders/${data._id}`);
        // dispatch({ type: "PAY_SUCCESS", payload: data });
        // alert(
        //   `name: ${name}, address: ${address}, number: ${number}, payment method: ${paymentMethod}, card: ${card}, price: ${price}`
        // );
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        alert(err.message);
        console.error("paypal error: ", err);
      }
    });
  };

  const onError = (err) => {
    alert(err.message);
    console.error("paypal error: ", err);
  };

  return (
    <Layout title="Cart">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <div className="cart-layout">
          <div className="cart-grid">
            <div className="cart-title">
              <h3>Items in Cart</h3>
            </div>
            <CartComponent cartItems={cartItems} dispatch={dispatch} />
          </div>

          <div className="delivery">
            <div className="cart-title">
              <h3>Delivery</h3>
            </div>
            <>
              {userInfo ? (
                <FormProvider {...methods}>
                  <form id="order" onSubmit={handleSubmit(submitHandler)}>
                    <Delivery />
                  </form>
                </FormProvider>
              ) : (
                <>
                  <p>Please log in to purchase</p>
                  <button
                    onClick={() => {
                      loginHandler();
                    }}
                  >
                    Log In
                  </button>
                </>
              )}
            </>
          </div>

          <div className="payment">
            {userInfo ? (
              <>
                <div className="cart-title">
                  <h3>Payment</h3>
                </div>
                <FormProvider {...methods}>
                  <form id="order" onSubmit={handleSubmit(submitHandler)}>
                    <Payment />
                  </form>
                </FormProvider>
              </>
            ) : (
              <></>
            )}
            <div className="summary">
              <h3>Order Summary</h3>
              <div className="summary-content">
                <h4>{cartItems.reduce((a, c) => a + c.quantity, 0)} items</h4>
                <h4>$ {price}</h4>
              </div>
              <div className="summary-content">
                <h4>Delivery</h4>
                <h4>Free</h4>
              </div>
              <div className="summary-content">
                <h3>Total</h3>
                <h3>$ {price}</h3>
              </div>
            </div>
            {watchPaymentMethod === "paypal" ? (
              <PayPalButtons
                createOrder={createOrder}
                form="order"
                onApprove={onApprove}
                onError={onError}
              />
            ) : (
              <button
                className="order-button"
                type="submit"
                value="submit"
                form="order"
                disabled={!isValid || !isDirty}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

// export default Cart;
export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});

// const inputMask = (value) => {
//   return (
//     value
//       .replace(/\s/g, "")
//       .match(/.{1,4}/g)
//       ?.join(" ")
//       .substr(0, 19) || ""
//   );
// };
//   const [isEmpty, setIsEmpty] = useState(true);

//used to hydrate the client side
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       setIsEmpty(true);
//     } else {
//       setIsEmpty(false);
//     }
//   }, []);
//learnt that we can use dynamic from next to make serverside rendering false
