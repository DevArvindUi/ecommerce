import React, { useState, useContext, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";

import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../../context/categories-context";
import { FiShoppingBag } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "../../../context/CartContext";
import { useWishlistGlobalContext } from "../../../context/WishListContext";
import { StoreContext } from "../../../context/store-settings-context";
//components import
import CartPopup from "../../Cart/Cartpopup";
import WishPopup from "../../Cart/WishPopup";
import Search from "../../Search/Search";
import Register from "../../auth/Register";
import Login from "../../auth/Login";
import SearchModal from "../../Search/SearchModal";
import useMediaQuery from "../../../hooks/useMediaQuery";
import AppDrawer from "../AppDrawer/AppDrawer";

export default function NavBar({ setIsWishlisted, setGuestLogin }) {
   const { cart } = useGlobalContext();
   const { wishlist } = useWishlistGlobalContext();
   const token = localStorage.getItem("auth_token");
   const { categories } = useContext(CategoriesContext);
   const { storeSettings } = useContext(StoreContext);
   const navigate = useNavigate();
   const [signInModal, setSignInModal] = useState(false); //login
   const [registerModal, setRegisterModal] = useState(false); //register
   const [cartModal, setcartModal] = useState(false); //cart
   const [wishListModal, setWishListModal] = useState(false);
   const [OtpModal, setOtpModal] = useState(false); //otp
   const [searchModal, setSearchModal] = useState(false); //search
   const [filteredCategory, setfilteredCategory] = useState([]);
   const isDesktop = useMediaQuery("(max-width: 1025px)");
   const drawerRef = useRef();
   const searchToggle = () => {
      setSearchModal(true);
   };

   const navLink = (path) => {
      navigate(path);
      drawerRef?.current?.setOpen(false);
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

   const cartToggle = () => {
      setcartModal(true);
   };

   const wishListToggle = () => {
      setWishListModal(true);
   };
   const OtpToggle = (e) => {
      e.preventDefault();
      setSignInModal(false);
      setOtpModal(true);
   };

   useEffect(() => {
      //  let filteredCategories = [];
      if (categories?.length > 6) {
         setfilteredCategory(categories.slice(0, 5));
      } else {
         setfilteredCategory(categories);
      }
   }, []);
   return (
      <>
         <ToastContainer autoClose={2000} theme="colored" />
         <nav className="app-nav navbar-expand-lg navbar-light bg-white">
            <div className="row d-flex align-items-center w-100 py-2">
               <div className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 order-1 order-sm-1 order-md-1 order-lg-1 order-xl-1">
                  <Link to="/">
                     <img src={storeSettings.logo} alt="logo" className="p-2 newLogo" />
                  </Link>
               </div>

               {/* isDesktop? fragment : Offcanvas html */}
               <AppDrawer ref={drawerRef} fragment={!isDesktop}>
                  <div className={`col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 order-3 order-sm-3 order-md-3 order-lg-2 order-xl-2 text-start`}>
                     <div id="navbarNav">
                        <div className="show-sm p-3">
                           <img src={storeSettings.logo} alt="logo" style={{ display: "block", width: "80px" }} />
                           CartPopup{" "}
                        </div>
                        <ul className="navbar-nav">
                           <Navlist onNavigate={() => navLink("/")} isDesktop={isDesktop} title="Home" />

                           {filteredCategory?.map((category, idx) => (
                              <React.Fragment key={category?.id}>
                                 <Navlist
                                    onNavigate={() => navLink(category?.id ? `/search?category_ids[]=${category?.id}` : "#")}
                                    isDesktop={isDesktop}
                                    title={category.name}
                                    childrenList={category?.childrens}
                                    arrow={category?.childrens?.length !== 0}
                                    subcategory_navigate={navLink}
                                 />
                              </React.Fragment>
                           ))}

                           {categories?.length > 6 ? (
                              <div className="dropdown more_dropdown">
                                 <button className="btn btn-outline dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    More
                                 </button>
                                 <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {categories.slice(5).map((element) => (
                                       <li className="nav-item custom-nav-item position-relative" key={element.id}>
                                          <Link
                                             className="dropdown-item d-flex justify-content-between align-items-center"
                                             id="navbarDropdown"
                                             role="button"
                                             key={element.id}
                                             to={element.id ? `/search?category_ids[]=${element.id}` : "#"}>
                                             {/* &page=1&per_page=15&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true */}
                                             <span>{element.name}</span>
                                             {element.childrens.length !== 0 && <IoIosArrowForward />}
                                          </Link>
                                          {element.childrens.length !== 0 ? (
                                             <ul className={`subnavs ${element.childrens.length > 2 ? "columns_class" : ""}`}>
                                                {element.childrens.map((subcat) => (
                                                   <li className="nav-item" key={subcat.id}>
                                                      <Link className="nav-link submenu-heads" to={subcat.id ? `/search?category_ids[]=${subcat.id}` : "#"}>
                                                         {subcat.name}
                                                      </Link>
                                                      {subcat.childrens.map((val) => (
                                                         <ul key={val.id}>
                                                            <li className="subcats">
                                                               <Link to={val.id ? `/search?category_ids[]=${val.id}` : "#"}>{val.name}</Link>
                                                            </li>
                                                         </ul>
                                                      ))}
                                                   </li>
                                                ))}
                                             </ul>
                                          ) : null}
                                       </li>
                                    ))}
                                 </div>
                              </div>
                           ) : null}
                        </ul>
                     </div>
                  </div>
               </AppDrawer>
               {/* isDesktop? fragment : Offcanvas html */}

               <div className="col-10 col-sm-10 col-md-10 col-lg-3 col-xl-3 order-2 order-sm-2 order-md-2 order-lg-3 order-xl-3 text-end">
                  <div className="d-flex justify-content-end align-items-center">
                     <span className="nav-item">
                        <Search searchToggle={searchToggle} />
                        {token ? (
                           <button
                              type="button"
                              className="signinBtn"
                              onClick={() => {
                                 navigate("/my-account/orders", { replace: true });
                              }}>
                              <FaUser size={20} className="theme_icon_color cursor_class" />
                           </button>
                        ) : (
                           <button type="button" className="signinBtn" onClick={signInToggle}>
                              Sign in
                           </button>
                        )}
                     </span>
                     <span className="nav-item">
                        <AiOutlineHeart size={25} onClick={token == null ? () => setSignInModal(true) : wishListToggle} className="theme_icon_color cursor_class" />
                        <span className="total_quantity">{token && wishlist && wishlist?.wishlist_count ? wishlist?.wishlist_count : 0}</span>
                     </span>
                     <span className="nav-item">
                        <FiShoppingBag size={22} onClick={cartToggle} style={{ marginLeft: "27px" }} className="theme_icon_color cursor_class" />
                        <span className="total_quantity">{cart?.total_quantity ? cart?.total_quantity : 0}</span>
                     </span>
                     <span className="nav-item show-sm">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                           <AiOutlineMenu size={35} onClick={() => drawerRef?.current?.setOpen(true)} />
                        </span>
                     </span>
                  </div>
               </div>
            </div>
         </nav>
         {/*cart modal */}
         <CartPopup setcartModal={setcartModal} cartModal={cartModal} />
         {/* searchbar modal*/}
         <WishPopup wishListModal={wishListModal} setWishListModal={setWishListModal} setIsWishlisted={setIsWishlisted} />
         <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />

         {/* signin modal */}
         <Login
            signInModal={signInModal}
            setSignInModal={setSignInModal}
            registerToggle={registerToggle}
            signInToggle={signInToggle}
            OtpToggle={OtpToggle}
            OtpModal={OtpModal}
            setOtpModal={setOtpModal}
            setGuestLogin={setGuestLogin}
         />

         {/*  register modal start*/}
         <Register registerModal={registerModal} setRegisterModal={setRegisterModal} signInToggle={signInToggle} setSignInModal={setSignInModal} setGuestLogin={setGuestLogin} />
      </>
   );
}

const Navlist = ({ title, onNavigate, subcategory_navigate, childrenList, isDesktop, arrow }) => {
   const [open, setOpen] = useState(false);
   return (
      <>
         <li className="nav-item custom-nav-item">
            <span className={`nav-link d-flex align-items-center ${!isDesktop ? "custom-nav-link" : "fs-6"}`}>
               <div onClick={onNavigate}>{title}</div>
               {arrow && (
                  <div className="w-100 text-end">
                     <IoIosArrowDown className="cursor-pointer" onClick={() => setOpen(!open)} />
                  </div>
               )}
            </span>
            {childrenList && childrenList?.length !== 0 ? (
               <ul className={`${isDesktop ? "columns_class ml-3" : "subnavs"}`} style={{ marginLeft: isDesktop ? "20px" : "0px", display: isDesktop && !open ? "none" : "block" }}>
                  {childrenList?.map((subcat) => (
                     <li className="nav-item" key={subcat?.id}>
                        <span className="nav-link submenu-heads" onClick={() => subcategory_navigate(subcat?.id ? `/search?category_ids[]=${subcat?.id}` : "#")}>
                           {subcat?.name}
                        </span>
                        {subcat?.childrens?.map((val) => (
                           <ul key={val.id}>
                              <li className="subcats">
                                 <span onClick={() => subcategory_navigate(val?.id ? `/search?category_ids[]=${val?.id}` : "#")}>{val?.name}</span>
                              </li>
                           </ul>
                        ))}
                     </li>
                  ))}
               </ul>
            ) : null}
         </li>
      </>
   );
};
