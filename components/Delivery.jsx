import React from "react";
import { useFormContext } from "react-hook-form";

const Delivery = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="cart-input">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          maxLength="16"
          placeholder="Your full name"
          {...register("name", {
            required: true,
            maxLength: 16,
          })}
        ></input>
        {errors?.name && (
          <p className="form-error">
            {errors.name.type === "required"
              ? "This field is required"
              : errors.name.type === "maxLength"
              ? "Max length is 16 characters"
              : errors.name.type === "validate"
              ? "Invalid Name"
              : ""}
          </p>
        )}
      </div>
      <div className="cart-input">
        <label htmlFor="address">Delivery Address</label>
        <input
          id="address"
          placeholder="e.g. 123 George Street Sydney"
          {...register("address", { required: true, maxLength: 50 })}
        ></input>
        {errors.address && (
          <p className="form-error">
            {errors.address.type === "required"
              ? "This field is required"
              : errors.address.type === "maxLength"
              ? "Max length is 50 characters"
              : ""}
          </p>
        )}
      </div>
      <div className="cart-input">
        <label htmlFor="number">Mobile Number</label>
        <input
          id="number"
          type="tel"
          placeholder="e.g. 0401 234 567"
          {...register("number", { required: true, maxLength: 16 })}
        ></input>
        {errors.number && (
          <p className="form-error">
            {errors.number.type === "required"
              ? "This field is required"
              : errors.number.type === "maxLength"
              ? "Max length is 16 characters"
              : ""}
          </p>
        )}
      </div>
    </>
  );
};

export default Delivery;
