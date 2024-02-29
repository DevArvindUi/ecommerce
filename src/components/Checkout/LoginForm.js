import React, { useState } from "react";
import { useForm } from "react-hook-form";
//auth imports
import { BASE_URL } from "../../config/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { useGlobalContext } from "../../context/CartContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = ({ SignupScreen, setactiveStep, setGuestLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const cartToken = localStorage.getItem("cart_token");
  const { fetchWishlistItems } = useWishlistGlobalContext();
  const { fetchAuthCart } = useGlobalContext();
  const passwordProps = {
    size: 20,
    role: "button",
    className: "position-absolute eye-icon theme_icon_color",
  };
  const [loginuser, setloginuser] = useState({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: loginuser,
    mode: "all",
  });

  //login field handle change event
  const loginhandleChange = (e) => {
    const { name, value } = e.target;
    setloginuser({
      ...loginuser,
      [name]: value,
    });
  };

  const continueAsGuest = () => {
    localStorage.setItem("isGuest","true");
    setGuestLogin(true);
  }
  const navigateAction = (userToken) => {
    if (userToken) {
      setactiveStep(1);
      fetchWishlistItems(userToken);
      fetchAuthCart(userToken);
    }
  };

  //on login form submit
  const onSubmit = async () => {
    const headers = { CartAuthorization: `${cartToken}` };
    axios
      .post(`${BASE_URL}/sessions`, loginuser, { headers })
      .then((res) => {
        localStorage.setItem("auth_token", res.data.data.token);
        localStorage.removeItem("cart_token");
        navigateAction(res.data.data.token);
        localStorage.setItem("isGuest", "false")
      })
      .catch((error) => {
        reset({ email: "", password: "" });
        toast.error(error.response.data.meta.message);
      });
  };
  return (
    <div className="check_form checkout_form">
      <form
        autoComplete="off"
        style={{ width: "80%", margin: "auto" }}
        className="slide"
      >
        <div className="form-group mt-3">
          <label>Email *</label>
          <input
            {...register("email", {
              onChange: (e) => {
                loginhandleChange(e);
              },
              pattern: /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i,
              required: true,
            })}
            className="form-control"
            type="email"
            name="email"
          />
          {errors?.email?.type === "required" && (
            <p className="form_errors">Email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="form_errors">Please enter a valid email address</p>
          )}
        </div>
        <div className="form-group mt-3">
          <label>Password *</label>
          <div className="position-relative">
            <input
              {...register("password", {
                onChange: (e) => {
                  loginhandleChange(e);
                },
                required: true,
              })}
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="password"
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                {...passwordProps}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                {...passwordProps}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          {errors.password && (
            <p className="form_errors">Password is required</p>
          )}
          <div className="row">
            <div className="col"></div>
            <div className="col-auto">
              <p style={{ color: "blue", marginTop: "14px" }}>
                Forgot password?
              </p>
            </div>
          </div>
        </div>
        <div className="form-group text-center mt-3">
          <button
            className="sign-in-Btn theme_button"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </div>

        <div className="account-footer mt-3 mb-4 d-flex justify-content-between">
          <p>
            Don't have an account yet?
            <span className="theme_link_color cursor_class" onClick={SignupScreen}>
              {""} Register
            </span>
          </p>

          <p className="theme_link_color cursor_class" onClick={continueAsGuest}>
           Continue as a guest 
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
