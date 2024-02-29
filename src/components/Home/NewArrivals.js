import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { StoreContext } from "../../context/store-settings-context";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import Login from "../auth/Login";
import Register from "../auth/Register";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [signInModal, setSignInModal] = useState(false); //login
  const [registerModal, setRegisterModal] = useState(false); //register
  const [OtpModal, setOtpModal] = useState(false); //otp
  const { storeSettings } = useContext(StoreContext);
  const { wishlist, removeFromWishlist, addToWishlist } =
    useWishlistGlobalContext();
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    getProductsCall();
  }, []);

  const getProductsCall = async () => {
    try {
      const prod_response = await axios.get(
        `${BASE_URL}/products/filter?page=1`
      );
      const prod_data = prod_response.data.data;
      setProducts(prod_data);
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const signInToggle = () => {
    setRegisterModal(false);
    setOtpModal(false);
    setSignInModal(true);
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

  const removeWish = (prod_id) => {
    let result = wishlist?.wishlist_items.filter(
      (ele) => ele?.product_id === prod_id
    );
    removeFromWishlist(result[0]?.id);
  };

  const addToWish = (item_id, item_type) =>{
    let wishlistInput = {
      item_id : item_id, 
      item_type: item_type
    }

    addToWishlist(wishlistInput);
  }
  return (
    <React.Fragment>
      <div className="mt-5 product_container">
        <div className="row">
          {products?.slice(0, 4).map((product) => (
            <div
              className="col-lg-3 col-md-3 product_details"
              key={product?.id}
            >
              <div className="card border-0">
                <Link
                  to={
                    product?.id
                      ? `/product/${product?.name}/${product?.id}`
                      : "#"
                  }
                >
                  <img
                    key={product?.gallery[0]?.id}
                    className="card-img-top prod_image prod_list_img"
                    src={`${
                      product?.gallery?.length > 0
                        ? product?.gallery[0]?.original
                        : "/images/image-not-found.jpg"
                    }`}
                    alt={product?.name}
                  />
                </Link>
                <div className="wishlist_product_div cursor_class">
                  {wishlist?.wishlist_items?.some(
                    (ele) => ele?.product_id === product?.id
                  ) ? (
                    <AiFillHeart
                      size={20}
                      onClick={() => removeWish(product?.id)}
                      className="wishlist_fill_icon"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={20}
                      className="theme_icon_color"
                      onClick={
                        token == null
                          ? () => setSignInModal(true)
                          : ()=>addToWish(product?.id, "Product")
                      }
                    />
                  )}
                </div>
                <div className="card-body product_body">
                  <Link
                    className="text-decoration-none text-dark"
                    to={
                      product.id
                        ? `/product/${product.name}/${product.id}`
                        : "#"
                    }
                  >
                    <h5 className="card-title">{product?.name}</h5>
                  </Link>
                  <div className="my-2">
                    <span className="fw-bold text-muted">
                      {storeSettings.currency_code} {product?.price_with_tax}
                    </span>
                    {product?.compare_price && (
                      <span className="m-2 text-muted">
                        <del>
                          {storeSettings.currency_code} {product?.compare_price}
                        </del>
                      </span>
                    )}
                  </div>
                  {product.average_rating && (
                    <ReactStars
                      count={5}
                      value={parseFloat(product?.average_rating)}
                      size={20}
                      edit={false}
                      isHalf={true}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* signin modal */}
      <Login
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        registerToggle={registerToggle}
        signInToggle={signInToggle}
        OtpToggle={OtpToggle}
        OtpModal={OtpModal}
        setOtpModal={setOtpModal}
      />

      {/*  register modal start*/}
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        signInToggle={signInToggle}
        setSignInModal={setSignInModal}
      />
    </React.Fragment>
  );
};
export default NewArrivals;
