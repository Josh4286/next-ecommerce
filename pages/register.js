import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";

const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // e.preventDefault(); don't need with react-hook-form
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
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
    <Layout title="Register">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Register</h1>
        <div className="form">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 16 }}
            render={({ field }) => (
              <div className="form-input">
                <label htmlFor="name">Name</label>
                <input id="name" {...field} maxLength="16"></input>
                <p className="form-error">
                  {errors.name
                    ? errors.name.type === "maxLength"
                      ? "16 characters max"
                      : "Name is required"
                    : ""}
                </p>
              </div>
            )}
          ></Controller>

          <Controller
            name="email"
            control={control}
            defaultValue=""
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
                  error={Boolean(errors.email)}
                ></input>
                <p className="form-error">
                  {errors.email
                    ? errors.email.type === "pattern"
                      ? "Invalid Email"
                      : "Email is required"
                    : ""}
                </p>
              </div>
            )}
          ></Controller>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 3,
            }}
            render={({ field }) => (
              <div className="form-input">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" {...field} />
                {errors.password && (
                  <p className="form-error">
                    {errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length must be 3 or more characters long"
                        : "Password is required"
                      : "The passwords do not match"}
                  </p>
                )}
              </div>
            )}
          ></Controller>

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: (value) => value === password.current,
            }}
            render={({ field }) => (
              <div className="form-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" {...field} />
                {errors.confirmPassword && (
                  <p className="form-error">
                    {errors.confirmPassword.type === "required"
                      ? "Password confirmation is required"
                      : ""}
                    {errors.confirmPassword.type === "validate"
                      ? "Password does not match"
                      : ""}
                  </p>
                )}
              </div>
            )}
          ></Controller>
          <button>Register</button>
        </div>
      </form>
      <div className="register-login-text">
        <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
          <a>Already have an Account? Click here to log in.</a>
        </NextLink>
      </div>
    </Layout>
  );
};

export default Register;
