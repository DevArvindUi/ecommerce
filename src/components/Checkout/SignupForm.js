import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../config/api";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { useGlobalContext } from "../../context/CartContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupForm = ({ LoginScreen, setactiveStep }) => {
  const cartToken = localStorage.getItem("cart_token");
  const { fetchWishlistItems } = useWishlistGlobalContext();
  const { fetchAuthCart } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [regUser, setregUser] = useState({
    name: "",
    email: "",
    full_phone_number: "",
    password: "",
    password_confirmation: "",
  });
  const passwordProps = {
    size: 20,
    role: "button",
    className: "position-absolute eye-icon theme_icon_color",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: regUser,
    mode: "all",
  });

  //form fields handle change event
  const registerhandleChange = (e) => {
    const { name, value } = e.target;
    setregUser({
      ...regUser,
      [name]: value,
    });
  };
  const navigateAction = (userToken) => {
    if (userToken) {
      setactiveStep(1);
      fetchWishlistItems(userToken);
      fetchAuthCart(userToken);
    }
  };
  //register and signin event
  const onSubmit = async () => {
    axios.post(`${BASE_URL}/users`, regUser).then((res) => {
      const headers = { CartAuthorization: `${cartToken}` };

      return axios
        .post(`${BASE_URL}/sessions`, regUser, {
          headers,
        })
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          localStorage.removeItem("cart_token");
          navigateAction(res.data.data.token);
          localStorage.setItem("isGuest", "false")
          // window.location.reload(false);
        });
    });
  };
  return (
    <div className="check_form checkout_form">
      <form
        autoComplete="off"
        style={{
          width: "80%",
          margin: "auto",
        }}
        className="slide"
      >
        <div className="form-group mt-3 ">
          <label>Full Name *</label>
          <input
            {...register("name", {
              onChange: (e) => {
                registerhandleChange(e);
              },
              required: true,
            })}
            className="form-control"
            type="text"
            name="name"
          />
          {errors.name && <p className="form_errors">Name is required</p>}
        </div>
        <div className="form-group d-flex justify-content-between mt-3">
          <div style={{ width: "48%" }}>
            <label>Email *</label>
            <input
              {...register("email", {
                onChange: (e) => {
                  registerhandleChange(e);
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
          <div style={{ width: "48%" }}>
            <label>Phone/Mobile *</label>
            <input
              {...register("full_phone_number", {
                onChange: (e) => {
                  registerhandleChange(e);
                },
                required: true,
                pattern:
                  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              })}
              className="form-control"
              type="tel"
              name="full_phone_number"
            />
            {errors?.full_phone_number?.type === "required" && (
              <p className="form_errors">Phone number is required</p>
            )}
            {errors?.full_phone_number?.type === "pattern" && (
              <p className="form_errors">Please enter a valid phone number</p>
            )}
          </div>
        </div>

        <div className="form-group d-flex justify-content-between mt-3">
          <div style={{ width: "48%" }}>
            <label>Password *</label>
            <div className="position-relative">
              <input
                {...register("password", {
                  onChange: (e) => {
                    registerhandleChange(e);
                  },
                  required: true,
                  minLength: 6,
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

            {errors?.password?.type === "required" && (
              <p className="form_errors">Password is required</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="form_errors">
                Password should contain atleast 6 characters
              </p>
            )}
          </div>
          <div style={{ width: "48%" }}>
            <label>Confirm Password *</label>
            <div className="position-relative">
              <input
                {...register("password_confirmation", {
                  onChange: (e) => {
                    registerhandleChange(e);
                  },
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                className="form-control"
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
              />
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  {...passwordProps}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiOutlineEye
                  {...passwordProps}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            {errors?.password_confirmation?.type === "required" && (
              <p className="form_errors">Confirm Password is required</p>
            )}
            {errors?.password_confirmation?.type === "validate" && (
              <p className="form_errors">Passwords do not match</p>
            )}
          </div>
        </div>

        <div className="form-group mt-3 text-center mt-3">
          <button
            className="sign-in-Btn theme_button"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </button>
        </div>
        <div className="account-footer mt-3 mb-4">
          <p>
            Already have an account?
            <span onClick={LoginScreen} className="theme_link_color cursor_class">
              {""} Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignupForm;
