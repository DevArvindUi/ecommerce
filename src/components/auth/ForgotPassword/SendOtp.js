import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../config/api";

const SendOtp = ({
  emailPhone,
  setemailPhone,
  setOtpStep,
  setenteredValue,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  //validate form
  const inputHandleChange = (e) => {
    setemailPhone(e.target.value);
  };

  const onSubmit = (values) => {
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;
    const phoneRegex = /(^[0-9]{10})+$/;
    let requestBody = {};

    if (emailRegex.test(emailPhone)) {
      setenteredValue("Email");
      requestBody = { email: emailPhone, full_phone_number: "" };
    }

    if (phoneRegex.test(emailPhone)) {
      setenteredValue("Mobile number");
      requestBody = { email: "", full_phone_number: emailPhone };
    }

    axios
      .post(`${BASE_URL}/sessions/create_otp`, requestBody)
      .then((res) => {
        toast.success(`OTP has been sent on registered ${values.emailPhone}`);
        setOtpStep(2);
      })
      .catch((error) => {
        reset({ emailPhone: "" });
        toast.error(error?.response?.data?.meta?.message);
      });
  };

  return (
    <form autoComplete="off">
      <div className="form-group">
        <label>Email / Phone Number</label>
        <input
          {...register("emailPhone", {
            onChange: (e) => {
              inputHandleChange(e);
            },
            pattern:
              /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/,
            required: true,
          })}
          className="form-control"
          type="text"
          name="emailPhone"
        />
        {errors?.emailPhone?.type === "required" && (
          <p className="form_errors">Email / Phone Number is required</p>
        )}
        {errors?.emailPhone?.type === "pattern" && (
          <p className="form_errors">Invalid Email / Phone Number</p>
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
    </form>
  );
};

export default SendOtp;
