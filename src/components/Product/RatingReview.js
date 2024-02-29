import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Login from "../auth/Login";
import Register from "../auth/Register";

const RatingReview = ({ productData }) => {
  const token = localStorage.getItem("auth_token");
  const [reviews, setreviews] = useState([]);
  const [signInModal, setSignInModal] = useState(false); //login
  const [registerModal, setRegisterModal] = useState(false); //register
  const [OtpModal, setOtpModal] = useState(false); //otp
  const [ratingflag, setratingflag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setreviews(productData.reviews);
  }, []);

  const signInToggle = () => {
    setRegisterModal(false);
    setOtpModal(false);
    setSignInModal(true);
    setratingflag(true);
  };

  const registerToggle = () => {
    setSignInModal(false);
    setRegisterModal(true);
  };

  const OtpToggle = (e) => {
    e.preventDefault();
    setSignInModal(false);
    setOtpModal(true);
  };

  //navigate to give rating page
  const navigateToRate = () => {
    const product_id = productData.id;
    const name = productData.name;
    const price_with_tax = productData.price_with_tax;
    const image = productData.gallery[0].medium;
    const average_rating = productData.average_rating;
    const compare_price = productData.compare_price;
    navigate(`/rate-product/${product_id}`, {
      state: {
        selectedProdRate: {
          product_id,
          name,
          price_with_tax,
          image,
          average_rating,
          compare_price,
        },
      },
    });
  };

  //rate this product action
  const rateProduct = () => {
    if (token != null) {
      navigateToRate(); //if logged in, can give ratings and review
    }
    if (token == null) {
      signInToggle(); //if not logged in, asked to login first
    }
  };

  //All reviews listing page
  const viewAllReviews = () => {
    const product_id = productData.id;
    navigate(`/view-ratings-reviews/${product_id}`, {
      state: {
        listReviews: {
          product_id,
        },
      },
    });
  };

  return (
    <>
      <div className="d-flex align-items-baseline justify-content-between rating_review">
        <div>
          <h6>Ratings & Reviews</h6>
        </div>

        <div>
          <button className="theme_button" onClick={rateProduct}>
            Rate Product
          </button>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="user_rating_div">
          {reviews.slice(0, 2).map((val) => (
            <div key={val.id} className="d-flex flex-column reviews_limited">
              <div className="rating_user d-flex align-items-baseline">
                <span>
                  <FaUserCircle
                    size={25}
                    style={{ marginRight: "10px" }}
                    color="gray"
                  />
                </span>
                <div>
                  <p className="mb-auto">{val.user}</p>
                  <ReactStars
                    count={5}
                    value={parseFloat(val.rating)}
                    size={20}
                    edit={false}
                    isHalf={true}
                  />
                  <div className="rating_comment_div mt-2">{val.comment}</div>
                </div>
              </div>
              <hr />
            </div>
          ))}
          {reviews.length > 3 && (
            <h6
              className="cursor_class text-primary"
              style={{ width: "fit-content" }}
              onClick={viewAllReviews}
            >
              View all Reviews
            </h6>
          )}
        </div>
      ) : (
        <p>No ratings and reviews found for this product</p>
      )}

      {/* signin modal */}
      <Login
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        registerToggle={registerToggle}
        signInToggle={signInToggle}
        OtpToggle={OtpToggle}
        OtpModal={OtpModal}
        setOtpModal={setOtpModal}
        ratingflag={ratingflag}
        navigateToRate={navigateToRate}
      />

      {/*  register modal start*/}
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        signInToggle={signInToggle}
        setSignInModal={setSignInModal}
        ratingflag={ratingflag}
        navigateToRate={navigateToRate}
      />
    </>
  );
};

export default RatingReview;
