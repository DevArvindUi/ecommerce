import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config/api";
import { StoreContext } from "../../../context/store-settings-context";
import { useWishlistGlobalContext } from "../../../context/WishListContext";
import Login from "../../../components/auth/Login";
import Register from "../../../components/auth/Register";

const NewArrivals = () => {
   const token = localStorage.getItem("auth_token");
   const [products, setProducts] = useState([]);
   const [signInModal, setSignInModal] = useState(false); //login
   const [registerModal, setRegisterModal] = useState(false); //register
   const [OtpModal, setOtpModal] = useState(false); //otp
   const navigate = useNavigate();
   const { storeSettings } = useContext(StoreContext);
   const { wishlist, removeFromWishlist, addToWishlist } = useWishlistGlobalContext();

   useEffect(() => {
      getProductsCall();
   }, []);

   const getProductsCall = async () => {
      try {
         const prod_response = await axios.get(`${BASE_URL}/products/filter?page=1`);
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
   const removeWish = (prod_id) => {
      let result = wishlist?.wishlist_items.filter((ele) => ele?.product_id === prod_id);
      removeFromWishlist(result[0]?.id);
   };

   const addToWish = (item_id, item_type) => {
      let wishlistInput = {
         item_id: item_id,
         item_type: item_type,
      };

      addToWishlist(wishlistInput);
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
   return (
      <div className="section-gap">
         <div className="container">
            <div className="row">
               <h2 className="text-center fw-bold fs-1 col-12">New Products</h2>
               <p className="text-center text-muted col-12 mb-5">COLLECTION 2023</p>
            </div>
            <div className="row">
               {products?.slice(0, 9).map((product, index) => (
                  <div key={index} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 px-3 mb-5 lh-1">
                     <Link className="text-decoration-none text-dark" to={product.id ? `/product/${product.name}/${product.id}` : "#"}>
                        <div className="product-image-container">
                           <img src={`${product?.gallery?.length > 0 ? product?.gallery[0]?.original : "/images/image-not-found.jpg"}`} alt={product?.name} className="w-100 h-100" />
                        </div>
                     </Link>
                     <div className="product-footer">
                        <div className="d-flex justify-content-between mt-3">
                           <p className="text-dark fs-6">{product.name}</p>
                           <div className="d-flex gap-2 align-items-center">
                              {wishlist?.wishlist_items?.some((ele) => ele?.product_id === product?.id) ? (
                                 <AiFillHeart size={20} onClick={() => removeWish(product?.id)} className="wishlist_fill_icon cursor_class" />
                              ) : (
                                 <AiOutlineHeart size={20} className="cursor_class" onClick={token == null ? () => setSignInModal(true) : () => addToWish(product?.id, "Product")} color="grey" />
                              )}
                              <FiShoppingBag size={18} color="grey" />
                           </div>
                        </div>
                        <p className="text-dark fs-5">
                           {storeSettings.currency_code} {product?.price_with_tax}
                        </p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="row">
               <button className="btn btn-outline-dark px-4 text-uppercase btnCommonSmall rounded-0 d-block m-auto w-auto py-2 px-4" onClick={() => navigate(`/search?all_products`)}>
                  View More
               </button>
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
         <Register registerModal={registerModal} setRegisterModal={setRegisterModal} signInToggle={signInToggle} setSignInModal={setSignInModal} />
      </div>
   );
};

export default NewArrivals;
