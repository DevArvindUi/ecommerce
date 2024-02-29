import React, { useContext, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config/api";
import { StoreContext } from "../../context/store-settings-context";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { useGlobalContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
  const {
    registerModal,
    setRegisterModal,
    signInToggle,
    ratingflag,
    navigateToRate,
  } = props;
  const cartToken = localStorage.getItem("cart_token");
  const { storeSettings } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchWishlistItems } = useWishlistGlobalContext();
  const { fetchAuthCart } = useGlobalContext();

  const [regUser, setregUser] = useState({
    name: "",
    email: "",
    full_phone_number: "",
    password: "",
    password_confirmation: "",
    termscheck: false,
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: regUser,
    mode: "all",
  });

  const navigateAction = (userToken) => {
    if (ratingflag == null) {
      navigate("/", { replace: true });
      // window.location.reload(false);
    }
    if (ratingflag != null) {
      navigateToRate();
      // window.location.reload(false);
    }
    if (userToken) {
      fetchWishlistItems(userToken);
      fetchAuthCart(userToken);
    }
  };

  const loginSubmit = (userEmail, userPassword) => {
    const loginuser = {
      email: userEmail,
      password: userPassword,
    };

    if (cartToken != null) {
      const headers = { CartAuthorization: `${cartToken}` };
      axios
        .post(`${BASE_URL}/sessions`, loginuser, { headers })
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          localStorage.removeItem("cart_token");
          toast.success("you are successfully registered and logged in!!");
          navigateAction(res.data.data.token);
          if(props.setGuestLogin !== undefined){
            props.setGuestLogin(false);
          }
          localStorage.setItem("isGuest", "false")

        })
        .catch((error) => {
          reset({ email: "", password: "" });
          toast.error(error?.response?.data?.meta?.message);
        });
    }
    if (cartToken == null) {
      axios
        .post(`${BASE_URL}/sessions`, loginuser)
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          toast.success("you are successfully registered and logged in!!");
          navigateAction(res.data.data.token);
          if(props.setGuestLogin !== undefined){
            props.setGuestLogin(false);
          }
          localStorage.setItem("isGuest", "false")
        })
        .then(() => {})
        .catch((error) => {
          reset({ email: "", password: "" });
          toast.error(error?.response?.data?.meta?.message);
        });
    }
  };

  const onSubmit = () => {
    axios
      .post(`${BASE_URL}/users`, regUser)
      .then((res) => {
        loginSubmit(regUser.email, regUser.password);
        setRegisterModal(false);
      })
      .catch((error) => {
        reset({
          name: "",
          email: "",
          full_phone_number: "",
          password: "",
          password_confirmation: "",
          termscheck: false,
        });
        toast.error(error.response.data.meta.message);
      });
  };

  //register form validation

  const registerhandleChange = (e) => {
    const { name, value } = e.target;
    setregUser({
      ...regUser,
      [name]: value,
    });
  };

  return (
    <>
      {/*register modal*/}
      <Modal
        centered
        show={registerModal}
        onHide={() => {
          setRegisterModal(false);
          reset({
            name: "",
            email: "",
            full_phone_number: "",
            password: "",
            password_confirmation: "",
          });
        }}
      >
        <div
          className="close-icon"
          onClick={() => {
            setRegisterModal(false);
            reset({
              name: "",
              email: "",
              full_phone_number: "",
              password: "",
              password_confirmation: "",
            });
          }}
        >
          <MdOutlineClose className="theme_icon_color" />
        </div>
        <Modal.Body className="register_modal_body">
          <div className="signin-wrapper">
            <div className="logo-div">
              <img src={storeSettings.logo} alt="logo" className="logo" />
              {/* <p>By signing up, you agree to our terms & policy</p> */}
            </div>

            <form autoComplete="off">
              <div className="form-group">
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
              <div className="form-group">
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
                  <p className="form_errors">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div className="form-group">
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
                  <p className="form_errors">
                    Please enter a valid phone number
                  </p>
                )}
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <AiOutlineEye
                      {...passwordProps}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
              <div>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    {...register("termscheck", {
                      onChange: (e) => {
                        registerhandleChange(e);
                      },
                      required: true,
                    })}
                    type="checkbox"
                    name="termscheck"
                  />
                  <label>
                    By signing up, you agree to our{" "}
                    <Link
                      className="text-capitalize text-decoration-none text-secondary"
                      to="/get-to-know-us/terms_and_policy"
                      onClick={() => setRegisterModal(false)}
                    >
                      Terms & Policy
                    </Link>
                  </label>
                </div>
                {errors?.termscheck?.type === "required" && (
                  <p className="form_errors">Terms and condition is required</p>
                )}
              </div>
              <div className="form-group text-center mt-3">
                <button
                  className="sign-in-Btn theme_button"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Register
                </button>
              </div>
              <div className="account-footer">
                <p>
                  Already have an account?
                  <span onClick={signInToggle} className="theme_link_color cursor_class">
                    {""} Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/*register modal end*/}
    </>
  );
};
export default Register;
