import React from "react";
import Image from "next/image";

const OrderProduct = ({ item }) => {
  return (
    <>
      <td>
        <Image
          src={item.image}
          alt="product image"
          layout="fixed"
          width="75px"
          height="150px"
          objectFit="cover"
        ></Image>
      </td>
      <td>
        <h3>{item.name}</h3>
      </td>
      <td>
        <h5>$ {item.price}</h5>
      </td>
      <td>
        <h5>{item.quantity}</h5>
      </td>
      <td>
        <h5>$ {item.quantity * item.price}</h5>
      </td>
    </>
  );
};

export default OrderProduct;
