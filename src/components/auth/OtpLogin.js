import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MdOutlineClose, MdOutlineArrowBack } from "react-icons/md";

// auth imports
import axios from "axios";
import { BASE_URL } from "../../config/api";

//otp input import
import OTPInput from "otp-input-react";

const OtpLogin = ({ setOtpModal, OtpModal, storeSettings, signInToggle }) => {
  const [mobile, setmobile] = useState("");
  const [pin, setpin] = useState("");
  const [screen, setscreen] = useState("");
  const cartToken = localStorage.getItem("cart_token");
  const navigate = useNavigate();

  //react hook forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: mobile,
    mode: "all",
  });

  useEffect(() => {
    setscreen("OTPLOGIN");
  }, []);

  //function to send OTP
  const onSubmit = () => {
    const headers = { "Content-Type": "application/json" };
    axios
      .post(
        `${BASE_URL}/sessions/create_pin`,
        { full_phone_number: mobile },
        { headers }
      )
      .then((res) => {
        toast.success(res.data.data.message);
        setscreen("VERIFYOTP");
      })
      .catch((error) => {
        reset({ mobile: "" });
        toast.error(error.response.data.meta.message);
      });
  };

  //function to verify OTP
  const verifyOtp = () => {
    if (cartToken != null) {
      const headers = {
        CartAuthorization: `${cartToken}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${BASE_URL}/sessions/verify_pin`,
          { full_phone_number: mobile, pin: pin },
          { headers }
        )
        .then((res) => {
         localStorage.setItem("auth_token", res.data.data.token);
         localStorage.removeItem("cart_token");
          setOtpModal(false);
          navigate("/", { replace: true });
          toast.info("you are successfully logged in!!");
        })
        .catch((err) => {
          toast.error(err.response.data.meta.message);
        });
    }
    if (cartToken == null) {
      const headers = { "Content-Type": "application/json" };
      axios
        .post(
          `${BASE_URL}/sessions/verify_pin`,
          { full_phone_number: mobile, pin: pin },
          { headers }
        )
        .then((res) => {
          localStorage.setItem("auth_token", res.data.data.token);
          setOtpModal(false);
          navigate("/", { replace: true });
          toast.info("you are successfully logged in!!");
        })
        .catch((err) => {
          toast.error(err.response.data.meta.message);
        });
    }
  };

  //function to close OTP modal
  const closeOtpModal = () => {
    setOtpModal(false);
    setpin("");
    reset();
    setscreen("OTPLOGIN");
  };

  //on clicking back button
  const goBackToOtpScreen = ()=>{
    setscreen("OTPLOGIN");
    setpin("");
  }
  return (
    <>
      <Modal centered show={OtpModal}>
        <div
          className="close-icon"
          onClick={closeOtpModal}
        >
          <MdOutlineClose className="theme_icon_color"/>
        </div>
        <Modal.Body className="">
          <div className="signin-wrapper">
           {screen === "VERIFYOTP" && <MdOutlineArrowBack size={30} className="cursor_class theme_icon_color" onClick={goBackToOtpScreen}/>}
            <div className="logo-div">
              <img src={storeSettings.logo} alt="logo" className="logo" />
            </div>
            {screen === "OTPLOGIN" && (
              <form autoComplete="off" className="mt-3">
                <div className="form-group">
                  <input
                    {...register("full_phone_number", {
                      onChange: (e) => {
                        setmobile(e.target.value);
                      },
                      required: true,
                      pattern:
                        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    })}
                    className="form-control"
                    type="tel"
                    placeholder="Enter Mobile number"
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
                <div className="form-group text-center mt-3">
                  <button
                    className="sign-in-Btn theme_button"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Send OTP
                  </button>
                </div>
                <div className="account-footer">
                  <p
                    className="theme_link_color text-center cursor_class"
                    onClick={signInToggle}
                  >
                    Login with Email and Password
                  </p>
                </div>
              </form>
            )}
            {screen === "VERIFYOTP" && (
              <>
                <h6 className="mb-4">Enter OTP</h6>
                <OTPInput
                  value={pin}
                  onChange={setpin}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  className="otpI"
                />
                <button
                  className="sign-in-Btn theme_button mt-4"
                  type="submit"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OtpLogin;
