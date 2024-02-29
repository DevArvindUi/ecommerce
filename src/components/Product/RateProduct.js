import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { BiErrorAlt } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { IoIosStarOutline, IoIosStarHalf, IoIosStar } from "react-icons/io";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack, MdStar } from "react-icons/md";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import { StoreContext } from "../../context/store-settings-context";

const RateProduct = () => {
  const token = localStorage.getItem("auth_token");
  const { state } = useLocation();
  const { selectedProdRate } = state;
  const { product_id, name, price_with_tax, image, average_rating, compare_price, order_item_id } =
    selectedProdRate;
  const { storeSettings } = useContext(StoreContext);

  // ######## States #########
  const [canRate, setcanRate] = useState({});
  const [loader, setloader] = useState(false);
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState("");
  const [ratingErr, setratingErr] = useState("");
  const [ratingText, setratingText] = useState("");
  const [ratingColor, setratingColor] = useState("");
  const [ratingBackColor, setratingBackColor] = useState("");
  const [orderDetailsFlag, setOrderDetailsFlag] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const navigate = useNavigate();
  useEffect(() => {
    canRateProduct();
    setratingErr("");
    setratingText("");

    if (average_rating <= "2.5") {
      setratingBackColor("red");
    }
    if (average_rating > "2.5" && average_rating <= "3.5") {
      setratingBackColor("orange");
    }
    if (average_rating > "3.5") {
      setratingBackColor("green");
    }

    //check if user is coming from order details page
    if (state?.selectedProdRate?.orderDetailFlag) {
      setOrderDetailsFlag(true);
    } else {
      setOrderDetailsFlag(false);
    }
  }, []);

  //check if user can rate this product
  const canRateProduct = () => {
    setloader(true);
    const headers = { Authorization: `${token}` };
    axios
      .get(`${BASE_URL}/reviews/can_review?product_id=${product_id}`, {
        headers,
      })
      .then((res) => {
        setcanRate(res.data.data);
        setloader(false);
      })
      .catch((err) => {
        setloader(true);
        setcanRate(err.response.data.meta);
        setloader(false);
        if (err?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };

  //rating change event
  const handleRating = (newRating) => {
    setrating(newRating);
    setratingErr("");
    if (newRating <= 1) {
      setratingText("Very Bad");
      setratingColor("red");
    } else if (newRating > 1 && newRating <= 2.5) {
      setratingText("Bad");
      setratingColor("orange");
    } else if (newRating > 2.5 && newRating <= 3.5) {
      setratingText("Good");
      setratingColor("green");
    } else if (newRating > 3.5 && newRating <= 4.5) {
      setratingText("Very Good");
      setratingColor("green");
    } else if (newRating === 5) {
      setratingText("Excellent");
      setratingColor("green");
    }
  };

  //move to all reviews ratings page
  const getAllReviews = () => {
    navigate(`/view-ratings-reviews/${product_id}`, {
      state: { listReviews: { product_id } },
    });
  };

  //review form submit event
  const onSubmitComment = () => {
    if (rating === "") {
      setratingErr("Rating can't be empty");
      return;
    } else {
      reset(setcomment(""));
      const headers = { Authorization: `${token}` };
      axios
        .post(
          `${BASE_URL}/reviews`,
          { product_id, rating, comment, order_item_id },
          { headers }
        )
        .then((res) => {
          toast.success("Your review has been submitted");
          // getAllReviews();
          navigate(-1);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.meta?.message);
          if (err?.response?.data?.meta?.message === "Token expired.") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("isGuest");
            navigate("/", { replace: true });
            window.location.reload(false);
          }
          if(err?.response?.data?.meta?.code === 422){
            navigate(-1);
          }
        });
    }
  };

  return (
    <div className="rate_product_main">
      {!loader ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-12 col-xs-12 rate_product_left">
                <div className="div_first">
                  <Link
                    to={product_id ? `/product/${name}/${product_id}` : "#"}
                    style={{ marginRight: "5%" }}
                  >
                    <img className="product_img" src={image ? image : "/images/image-not-found.jpg"} alt={name}/>
                  </Link>
                  <div className="d-flex align-items-baseline justify-content-between">
                    <div>
                      <Link
                        to={product_id ? `/product/${name}/${product_id}` : "#"}
                        className="text-decoration-none text-dark"
                      >
                        <h6 className="mt-3 cursor_class">{name}</h6>
                      </Link>
                      <span className="sell_price">
                        {storeSettings.currency_code}
                        {price_with_tax}
                      </span>
                      {compare_price && (
                        <span className="compare_price">
                          <del>
                            {storeSettings.currency_code}
                            {compare_price}
                          </del>
                        </span>
                      )}
                    </div>
                    <div>
                      {average_rating != null ? (
                        <div
                          className="rating_div"
                          style={{
                            backgroundColor: ratingBackColor,
                          }}
                        >
                          {Math.round(average_rating * 10) / 10}
                          <MdStar style={{ marginLeft: "5px" }} />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {canRate.can_review ? (
                <div className="col-lg-9 col-sm-12 col-xs-12 rate_product_right">
                  <div className="div position-relative">
                     {orderDetailsFlag === true && (
                        <MdOutlineArrowBack
                          size={30}
                          className="cursor_class theme_icon_color position-absolute"
                          onClick={() => navigate(-1)}
                        />
                      )}
                    <div className="stars_react mb-4">
                      <h5>How would you rate this product?</h5>
                      <ReactStars
                        size={35}
                        onChange={(newRating) => handleRating(newRating)}
                        edit={true}
                        isHalf={true}
                        emptyIcon={<IoIosStarOutline />}
                        halfIcon={<IoIosStarHalf />}
                        filledIcon={<IoIosStar />}
                      />
                      <p
                        style={{ fontSize: "14px" }}
                        className="mt-3 text-danger"
                      >
                        {ratingErr}
                      </p>
                    </div>
                    <span
                      style={{ color: ratingColor }}
                      className="mt-3 fw-bold"
                    >
                      {ratingText}
                    </span>
                    <hr />
                    <h5 className="mt-4">Review this Product</h5>
                    <div className="check_form">
                      <form autoComplete="off">
                        <div className="form-group mt-4">
                          <label>Your Message *</label>
                          <textarea
                            {...register("message", {
                              onChange: (e) => {
                                setcomment(e.target.value);
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
                        <div className="form-group mt-3">
                          <button
                            className="theme_button submit_comment mt-2"
                            type="submit"
                            onClick={handleSubmit(onSubmitComment)}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-9 col-sm-12 col-xs-12 rate_product_right rate_prod_not">
                  <div className="div">
                    <BiErrorAlt size={100} />
                    <div className="mt-5 lh-lg">
                      <h2 className="mb-3">
                        You haven't Purchased this Product
                      </h2>
                      <p className="text-muted">{canRate.message}</p>
                    </div>
                    <Link
                      to={product_id ? `/product/${name}/${product_id}` : "#"}
                      className="text-decoration-none text-dark"
                    >
                      <button className="theme_button buy_prod mt-3">
                        Buy Product
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}
    </div>
  );
};

export default RateProduct;
