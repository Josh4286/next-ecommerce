import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const submitHandler = async ({ email, password }) => {
    // e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      console.log(data);
      Cookies.set("userInfo", JSON.stringify(data));
      alert("sucessful login");
      router.push(redirect || "/");
      // redirect means it looks at the query, if there isn't one, it sends back to main page.
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Login</h1>
        <div className="form">
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{
              required: true,
              pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
            }}
            render={({ field }) => (
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...field}
                  // helperText={
                  //   errors.email
                  //     ? errors.email.type === "pattern"
                  //       ? "Email is not valid"
                  //       : "Email is required"
                  //     : ""
                  // } //I think this is only for MUI
                  error={Boolean(errors.email)}
                ></input>
                {errors.email && (
                  <p className="form-error">
                    {errors.email
                      ? errors.email.type === "pattern"
                        ? "Invalid Email"
                        : "Email is required"
                      : ""}
                  </p>
                )}
              </div>
            )}
          ></Controller>

          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => (
              <div className="form-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...field}
                  error={Boolean(errors.password)}
                />
                {errors.password && (
                  <p className="form-error">
                    {errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length must be 3 or more characters long"
                        : "Password is required"
                      : ""}
                  </p>
                )}
              </div>
            )}
          ></Controller>

          <button>Login</button>
        </div>
      </form>
      <div className="register-login-text">
        <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
          <a>{"Don't have an Account? Click here to register."}</a>
        </NextLink>
      </div>
    </Layout>
  );
};

export default Login;
