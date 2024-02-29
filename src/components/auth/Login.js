import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import "react-toastify/dist/ReactToastify.css";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { StoreContext } from "../../context/store-settings-context";
import { useGlobalContext } from "../../context/CartContext";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import OtpLogin from "./OtpLogin";
const Login = (props) => {
  const {
    signInModal,
    setSignInModal,
    registerToggle,
    signInToggle,
    OtpToggle,
    setOtpModal,
    OtpModal,
    ratingflag,
    navigateToRate,
  } = props;
  const cartToken = localStorage.getItem("cart_token");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPwdModal, setforgotPwdModal] = useState(false);
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

  const { storeSettings } = useContext(StoreContext);
  const { fetchWishlistItems } = useWishlistGlobalContext();
  const { fetchAuthCart } = useGlobalContext();
  const navigate = useNavigate();

  const passwordProps = {
    size: 20,
    role: "button",
    className: "position-absolute eye-icon theme_icon_color",
  };

  //validate form
  const loginhandleChange = (e) => {
    const { name, value } = e.target;
    setloginuser({
      ...loginuser,
      [name]: value,
    });
  };

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
  //submit button action

  const tokenExpiredCall = () => {
    setTimeout(()=>{
      localStorage.removeItem("auth_token");
      localStorage.removeItem("isGuest")
      navigate("/", { replace: true });
      window.location.reload(false);
    },1000)
  }
  const onSubmit = () => {
    if (cartToken != null) {
      const headers = { CartAuthorization: `${cartToken}` };
      axios
        .post(`${BASE_URL}/sessions`, loginuser, { headers })
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          localStorage.removeItem("cart_token");
          toast.success("you are successfully logged in!!");
          navigateAction(res.data.data.token);
          setSignInModal(false);
          if(props.setGuestLogin !== undefined){
            props.setGuestLogin(false);
          }
          localStorage.setItem("isGuest", "false")
        })
        .catch((error) => {
          reset({ email: "", password: "" });
          toast.error(error?.response?.data?.meta?.message);
          if(error?.response?.data?.meta?.message === "Token expired."){
            tokenExpiredCall();
          }
        });
    }
    if (cartToken == null) {
      axios
        .post(`${BASE_URL}/sessions`, loginuser)
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          toast.success("you are successfully logged in!!");
          navigateAction(res.data.data.token);
          setSignInModal(false);
          if(props.setGuestLogin !== undefined){
            props.setGuestLogin(false);
          }
          localStorage.setItem("isGuest", "false")
        })
        .then(() => {})
        .catch((error) => {
          reset({ email: "", password: "" });
          toast.error(error?.response?.data?.meta?.message);
          if(error?.response?.data?.meta?.message === "Token expired."){
            tokenExpiredCall();
          }
        });
    }
  };

  return (
    <>
      <Modal
        centered
        show={signInModal}
        onHide={() => {
          setSignInModal(false);
          reset({ email: "", password: "" });
        }}
      >
        <div
          className="close-icon"
          onClick={() => {
            setSignInModal(false);
            reset({ email: "", password: "" });
          }}
        >
          <MdOutlineClose className="theme_icon_color" />
        </div>
        <Modal.Body className="login_modal_body">
          <div className="signin-wrapper">
            <div className="logo-div">
              <img src={storeSettings.logo} alt="logo" className="logo" />
              <p className="mt-3">Login with your email & password</p>
            </div>

            <form autoComplete="off">
              <div className="form-group">
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
                  <p className="form_errors">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div className="form-group">
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
                    <p
                      onClick={() => {
                        setSignInModal(false);
                        setforgotPwdModal(true);
                      }}
                      className="cursor_class fw-bold"
                    >
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
              <p className="text-center">OR</p>
              <div className="form-group text-center mt-3">
                <button
                  className="sign-in-Btn theme_button"
                  type="submit"
                  onClick={OtpToggle}
                >
                  Login with OTP
                </button>
              </div>
              <div className="account-footer">
                <p>
                  Don't have an account yet?
                  <span onClick={registerToggle} className="theme_link_color cursor_class">
                    {""} Register
                  </span>
                </p>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <OtpLogin
        setOtpModal={setOtpModal}
        OtpModal={OtpModal}
        signInToggle={signInToggle}
        storeSettings={storeSettings}
      />
      <ForgotPassword
        forgotPwdModal={forgotPwdModal}
        setforgotPwdModal={setforgotPwdModal}
        setSignInModal={setSignInModal}
      />
    </>
  );
};
export default Login;
