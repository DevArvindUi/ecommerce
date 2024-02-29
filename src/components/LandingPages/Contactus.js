import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/store-settings-context";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contactus = () => {
  const navigate = useNavigate();
  const { storeSettings } = useContext(StoreContext);
  const [loader, setloader] = useState(false);
  const token = localStorage.getItem("auth_token");
  const [submitted, setsubmitted] = useState(false);
  const [message, setmessage] = useState("");
  const [contact, setcontact] = useState({
    name: "",
    email: "",
    full_phone_number: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: contact,
    mode: "all",
  });

  //input change handler
  const contactChange = (e) => {
    const { name, value } = e.target;
    setcontact({
      ...contact,
      [name]: value,
    });
  };

  //fetch user details initially
  useEffect(() => {
    if (token != null) {
      fetchUserData();
    }
  }, []);

  //function to fetch data
  const fetchUserData = async () => {
    try {
      setloader(true);
      const headers = { Authorization: `${token}` };
      const res = await axios.get(`${BASE_URL}/users/current_user_detail`, { headers });
      const data = res.data.data;
      setcontact(data);
      setloader(false);
      reset(res.data.data);
    } catch (error) {
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
    axios
      .post(`${BASE_URL}/contacts`, contact)
      .then((res) => {
        // toast.success(res.data.data.message);
        setmessage(res.data.data.message);
        setsubmitted(true);
        reset({ name: "", email: "", full_phone_number: "", message: "" });
      })
      .catch((err) => {
        toast.error(err.response.data.meta.message);
        if (err?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };
  return (
    <React.Fragment>
      <div className="container_fluid contact_us_page">
        <div className="row py-5 my-5">
          <div className="col-lg-5 col-sm-12 col-xs-12 contact_details_col">
            <h5 className="mb-4">Find us here</h5>
            <div className="contact_details_div">
              <FaMapMarkerAlt className="contact_icons" />
              <div className="right_div">
                <h6>Address</h6>
                <p>{storeSettings.address}</p>
              </div>
            </div>

            <div className="contact_details_div">
              <MdEmail className="contact_icons" />
              <div className="right_div">
                <h6>Email</h6>
                <p>{storeSettings.customer_support_email}</p>
              </div>
            </div>

            <div className="contact_details_div">
              <BsFillTelephoneFill className="contact_icons" />
              <div className="right_div">
                <h6>Phone</h6>
                <p>{storeSettings.customer_care_number}</p>
              </div>
            </div>
          </div>

          {/* conditionally render form and succes message */}
          <div className="col-lg-7 col-sm-12 col-xs-12">
            {!submitted ? (
              <>
                {!loader ? (
                  <div className="check_form checkout_form">
                    <form
                      autoComplete="off"
                      style={{
                        width: "80%",
                        margin: "auto",
                      }}
                      className="slide"
                    >
                      <h4>Get in touch</h4>
                      <div className="mt-5">
                        <div className="form-group ">
                          <div className="form-group mt-3">
                            <label>Full Name *</label>
                            <input
                              {...register("name", {
                                onChange: (e) => {
                                  contactChange(e);
                                },
                                required: true,
                              })}
                              className="form-control"
                              type="text"
                              name="name"
                            />
                            {errors.name && (
                              <p className="form_errors">Name is required</p>
                            )}
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-between my-3">
                          <div style={{ width: "48%" }}>
                            <label>Email *</label>
                            <input
                              {...register("email", {
                                onChange: (e) => {
                                  contactChange(e);
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

                          <div style={{ width: "48%" }}>
                            <label>Phone/Mobile *</label>
                            <input
                              {...register("full_phone_number", {
                                onChange: (e) => {
                                  contactChange(e);
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
                              <p className="form_errors">
                                Phone number is required
                              </p>
                            )}
                            {errors?.full_phone_number?.type === "pattern" && (
                              <p className="form_errors">
                                Please enter a valid phone number
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="form-group my-3">
                          <div>
                            <label>Message *</label>
                            <textarea
                              {...register("message", {
                                onChange: (e) => {
                                  contactChange(e);
                                },
                                required: true,
                              })}
                              name="message"
                              rows="4"
                              cols="30"
                              className="form-control"
                            />
                            {errors.message && (
                              <p className="form_errors">Message is required</p>
                            )}
                          </div>
                        </div>

                        <div className="form-group mt-3 text-center mt-3">
                          <button
                            className="theme_button mt-4 contact_us_button"
                            type="submit"
                            style={{
                              padding: "12px 20px",
                              borderRadius: "10px",
                            }}
                            onClick={handleSubmit(onSubmit)}
                          >
                            Update details
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="load_spinner">
                    <TailSpin color="#000000" height={60} width={60} />
                  </div>
                )}
              </>
            ) : (
              <div className="contact_thank">
                <h5>{message}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Contactus;
