import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose, MdOutlineArrowBack } from "react-icons/md";
import { StoreContext } from "../../../context/store-settings-context";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";

const ForgotPassword = ({
  forgotPwdModal,
  setforgotPwdModal,
  setSignInModal,
}) => {
  const [emailPhone, setemailPhone] = useState("");
  const [verifyInput, setverifyInput] = useState({
    email: "",
    sentOtp: "",
  });
  const [passwordFields, setpasswordFields] = useState({
    password: "",
    password_confirmation: "",
  });
  const [otpStep, setOtpStep] = useState(1);
  const [enteredValue, setenteredValue] = useState("");
  const { storeSettings } = useContext(StoreContext);

  const navigateToScreen = () => {
    if (otpStep === 1) {
      setSignInModal(true);
      setforgotPwdModal(false);
    }
    if (otpStep === 2) {
      setOtpStep(1);
    }
  };

  return (
    <>
      <Modal
        centered
        show={forgotPwdModal}
        onHide={() => {
          setforgotPwdModal(false);
          setOtpStep(1);
        }}
      >
        <div
          className="close-icon"
          onClick={() => {
            setforgotPwdModal(false);
            setOtpStep(1);
          }}
        >
          <MdOutlineClose className="theme_icon_color" />
        </div>
        <Modal.Body className="">
          <div className="signin-wrapper">
            {(otpStep === 1 || otpStep === 2) && (
              <MdOutlineArrowBack
                size={30}
                className="cursor_class theme_icon_color mt-2"
                onClick={navigateToScreen}
              />
            )}
            <div className="logo-div">
              <img src={storeSettings.logo} alt="logo" className="logo" />
              <p className="my-4">
                {otpStep === 1 &&
                  "Enter your registered Email / Phone Number and we'll sent you an OTP to reset your password"}
                {otpStep === 2 && `OTP has been sent to your ${enteredValue}`}
                {otpStep === 3 && "Reset your password"}
              </p>
            </div>
            {otpStep === 1 && (
              <SendOtp
                setemailPhone={setemailPhone}
                emailPhone={emailPhone}
                setOtpStep={setOtpStep}
                setenteredValue={setenteredValue}
                enteredValue={enteredValue}
              />
            )}

            {otpStep === 2 && (
              <VerifyOtp
                emailPhone={emailPhone}
                setverifyInput={setverifyInput}
                verifyInput={verifyInput}
                setOtpStep={setOtpStep}
                enteredValue={enteredValue}
              />
            )}

            {otpStep === 3 && (
              <ResetPassword
                passwordFields={passwordFields}
                setpasswordFields={setpasswordFields}
                verifyInput={verifyInput}
                setforgotPwdModal={setforgotPwdModal}
                setSignInModal={setSignInModal}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPassword;
