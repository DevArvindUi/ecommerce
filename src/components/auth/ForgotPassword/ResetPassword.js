import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { BASE_URL } from "../../../config/api";
import { toast } from "react-toastify";

const ResetPassword = ({
  passwordFields,
  setpasswordFields,
  verifyInput,
  setforgotPwdModal,
  setSignInModal,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const passwordProps = {
    size: 20,
    role: "button",
    className: "position-absolute eye-icon theme_icon_color",
  };

  //validate form
  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setpasswordFields({
      ...passwordFields,
      [name]: value,
    });
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("pin", verifyInput.sentOtp);
    formData.append("password", values.password);
    formData.append("password confirmation", values.password_confirmation);

    axios
      .put(`${BASE_URL}/sessions/password_update`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setforgotPwdModal(false);
        setSignInModal(true);
      })
      .catch((error) => {
        reset({ password: "", password_confirmation: "" });
        toast.error(error?.response?.data?.meta?.message);
      });
  };

  return (
    <form autoComplete="off">
      <div className="form-group">
        <label>Password *</label>
        <div className="position-relative">
          <input
            {...register("password", {
              onChange: (e) => {
                inputHandleChange(e);
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
                inputHandleChange(e);
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
      <div className="form-group text-center mt-3">
        <button
          className="sign-in-Btn theme_button"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
