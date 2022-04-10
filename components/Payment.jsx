import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

const Payment = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchPaymentMethod = watch("paymentMethod");

  return (
    <div>
      <div className="cart-radio">
        <label htmlFor="radioCard" className="radio-container">
          <input
            className="radio-input"
            {...register("paymentMethod", { required: true })}
            type="radio"
            id="radioCard"
            name="paymentMethod"
            value="card"
          />
          Credit Card
        </label>
      </div>
      {watchPaymentMethod === "card" && (
        <div className="cart-card-container">
          <Controller
            control={control}
            name="card"
            defaultValue=""
            rules={{
              required: true,
              validate: (value) => value.replace(/\s/g, "").length === 16,
            }}
            render={({ field }) => (
              <div className="cart-radio-card-menu">
                <label htmlFor="card">Card Number</label>
                <NumberFormat
                  id="card"
                  placeholder="1234 1234 1234 1234"
                  format="#### #### #### ####"
                  {...field}
                />
                {errors.card && (
                  <p className="form-error">
                    {errors.card
                      ? errors.card.type === "validate"
                        ? "Please enter valid card"
                        : "this field is required"
                      : ""}
                  </p>
                )}
              </div>
            )}
          ></Controller>
        </div>
      )}
      <div className="cart-radio">
        <label htmlFor="radioPaypal" className="radio-container">
          <input
            className="radio-input"
            {...register("paymentMethod", { required: true })}
            type="radio"
            id="radioPaypal"
            name="paymentMethod"
            value="paypal"
          />
          Paypal
        </label>
      </div>
      {watchPaymentMethod === "paypal" && (
        <div className="cart-card-container">
          <p>
            When you click PAY NOW WITH PAYPAL, you will be redirected to PayPal
            to complete your order.
          </p>
        </div>
      )}
    </div>
  );
};

export default Payment;

{
  /* <input
      id="card"
      type="tel"
      inputMode="numeric"
      autoComplete="cc-number"
      name="card"
      maxLength="19"
      data-mask="04SS SSS SS9?9?"
      onChange={(event) => {
        const { value } = event.target;
        event.target.value = inputMask(value);
      }}
      {...register("card", { required: true, maxLength: 16 })}
      ref={(e) => {
        ref(e);
        cardRef.current = e;
      }}
    ></input> */
}
