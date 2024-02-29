import React from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../config/api";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOtp = ({
  verifyInput,
  setverifyInput,
  setOtpStep,
  emailPhone,
  enteredValue,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailPhone,
    },
    mode: "all",
  });

  //validate form
  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setverifyInput({
      ...verifyInput,
      [name]: value,
    });
  };

  const onSubmit = (values) => {
    let requestBody = {};
    if (enteredValue === "Email") {
      requestBody = {
        pin: values.sentOtp,
        email: values.email,
        full_phone_number: "",
      };
    }

    if (enteredValue === "Mobile number") {
      requestBody = {
        pin: values.sentOtp,
        email: "",
        full_phone_number: values.email,
      };
    }
    axios
      .post(`${BASE_URL}/sessions/verify_otp`, requestBody)
      .then((res) => {
        toast.success(res.data.message);
        setOtpStep(3);
      })
      .catch((error) => {
        reset({ sentOtp: "" });
        toast.error(error?.response?.data?.meta?.message);
      });
  };

  return (
    <form autoComplete="off">
      <div className="form-group">
        <label>{enteredValue}</label>
        <input
          {...register("email", {
            onChange: (e) => {
              inputHandleChange(e);
            },
          })}
          className="form-control"
          type="text"
          name="email"
          disabled={true}
        />
      </div>

      <div className="form-group">
        <label>OTP</label>
        <input
          {...register("sentOtp", {
            onChange: (e) => {
              inputHandleChange(e);
            },
            pattern: /^[0-9]{1,8}$/,
            required: true,
          })}
          className="form-control"
          type="text"
          name="sentOtp"
        />
        {errors?.sentOtp?.type === "required" && (
          <p className="form_errors">Otp is required</p>
        )}
        {errors?.sentOtp?.type === "pattern" && (
          <p className="form_errors">Enter a valid otp</p>
        )}
      </div>
      <div className="form-group text-center mt-3">
        <button
          className="sign-in-Btn theme_button"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default VerifyOtp;
