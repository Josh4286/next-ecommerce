import axios from "axios";
import { useRouter } from "next/router";
import React, { useReducer, useContext, useEffect } from "react";
import { Store } from "../../utils/Store";
import dynamic from "next/dynamic";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import OrderProduct from "../../components/OrderProduct";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "", order: {} };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, order: {}, error: action.payload };
    default:
      state;
  }
}

const Order = ({ params }) => {
  const router = useRouter();
  const orderId = params.id;
  const { state } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    } else {
    }
  }, []);

  return (
    <Layout title={`Order ${orderId}`}>
      <h2>Order {orderId}</h2>
      <div className="orderItems">
        <table className="order-table">
          <tr>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {orderItems?.map((item) => (
            <tr>
              <OrderProduct item={item} />
            </tr>
          ))}
        </table>
        <div className="order-price">
          <h3>Total Price</h3>
          <h3>$ {totalPrice}</h3>
        </div>
      </div>
      <div>
        <div className="order-details">
          <div className="order-detail-row">
            <h4>Delivery Address</h4>
            <h5>{shippingAddress}</h5>
            <h5>{isDelivered ? "Delivered" : "Not Delivered"}</h5>
          </div>
          <div className="order-detail-row">
            <h4>Payment Method</h4>
            <h5>{paymentMethod}</h5>
            <h5>{isPaid ? "Paid" : "Not Paid"}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps({ params }) {
  return { props: { params } };
}
//this code means that when we refresh the page we get the orderId from params in the URL

export default dynamic(() => Promise.resolve(Order), { ssr: false });
