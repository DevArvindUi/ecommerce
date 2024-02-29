import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Accountupdate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setloader] = useState(true);
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    full_phone_number: "",
    password: "",
    password_confirmation: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
    mode: "all",
  });

  const passwordProps = {
    size: 20,
    role: "button",
    className: "position-absolute eye-icon theme_icon_color",
  };
  //fetch account details of user
  const fetchCurrentUser = async () => {
    try {
      setloader(true);
      const headers = { Authorization: `${token}` };
      const res = await axios.get(`${BASE_URL}/users/current_user_detail`, {
        headers,
      });
      const data = res.data.data;
      setuserData(data);
      setloader(false);
      reset(res.data.data);
    } catch (error) {
      toast.error(error.response.data.meta.message);
      setloader(false);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  //submit button action , update account details
  const onSubmit = () => {
    const headers = { Authorization: `${token}` };
    axios
      .put(`${BASE_URL}/users/current_user_detail`, userData, {
        headers,
      })
      .then((response) => {
        toast.success("Successfully Updated");
      })
      .catch((error) => {
        toast.error(error.response.data.meta.message);
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };

  //input change handler
  const addChange = (e) => {
    const { name, value } = e.target;
    setuserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (token != null) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <React.Fragment>
      {!loader ? (
        <>
          <h5 className="mb-4 mx-4">My Account Details</h5>
          <div className="check_form account_update">
            <form autoComplete="off">
              <div className="form-group mt-3">
                <label>Full Name *</label>
                <input
                  {...register("name", {
                    onChange: (e) => {
                      addChange(e);
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
                        addChange(e);
                      },
                      pattern: /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      required: true,
                    })}
                    className="form-control"
                    type="email"
                    name="email"
                    disabled={true}
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

                <div style={{ width: "48%" }}>
                  <label>Phone/Mobile *</label>
                  <input
                    {...register("full_phone_number", {
                      onChange: (e) => {
                        addChange(e);
                      },
                      required: true,
                      pattern:
                        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    })}
                    className="form-control"
                    type="tel"
                    name="full_phone_number"
                    disabled={true}
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
              </div>

              <div className="form-group d-flex justify-content-between mt-3">
                <div style={{ width: "48%" }}>
                  <label>Password </label>
                  <div className="position-relative">
                    <input
                      {...register("password", {
                        onChange: (e) => {
                          addChange(e);
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
                  <label>Confirm Password</label>
                  <div className="position-relative">
                    <input
                      {...register("password_confirmation", {
                        onChange: (e) => {
                          addChange(e);
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
              </div>
              <button
                className="theme_button mt-4 base_button"
                type="submit"
                style={{ padding: "12px 20px", borderRadius: "10px" }}
                onClick={handleSubmit(onSubmit)}
              >
                Update details
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}
    </React.Fragment>
  );
};
export default Accountupdate;
