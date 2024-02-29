import React, { useState, useContext, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
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

const Header = ({ setIsWishlisted, setGuestLogin }) => {
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
  
  const searchToggle = () => {
    setSearchModal(true);
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

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <Link to="/" className="navbar-brand">
          <img src={storeSettings.logo} alt="logo" className="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mr-auto text-capitalize"
          >
            <li className="nav-item custom-nav-item">
              <Link to="/" className="nav-link custom-nav-link">
                Home
              </Link>
            </li>
            {filteredCategory.map((category) => (
              <li className="nav-item custom-nav-item" key={category?.id}>
                <Link
                  className="nav-link custom-nav-link"
                  id="navbarDropdown"
                  role="button"
                  key={category?.id}
                  to={category?.id ? `/search?category_ids[]=${category?.id}`: "#"}
                >
                  <span>{category.name}</span>
                  {category?.childrens?.length !== 0 && <IoIosArrowDown />}
                </Link>
                {category.childrens.length !== 0 ? (
                  <ul
                    className={`subnavs ${
                      category?.childrens?.length > 2 ? "columns_class" : ""
                    }`}
                  >
                    {category?.childrens?.map((subcat) => (
                      <li className="nav-item" key={subcat?.id}>
                        <Link
                          className="nav-link submenu-heads"
                          to={
                            subcat?.id
                              ? `/search?category_ids[]=${subcat?.id}`
                              : "#"
                          }
                        >
                          {subcat?.name}
                        </Link>
                        {subcat?.childrens?.map((val) => (
                          <ul key={val.id}>
                            <li className="subcats">
                              <Link
                                to={
                                  val?.id ? `/search?category_ids[]=${val?.id}` : "#"
                                }
                              >
                                {val?.name}
                              </Link>
                            </li>
                          </ul>
                        ))}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}

            {categories?.length > 6 ? (
              <div className="dropdown more_dropdown">
                <button
                  className="btn btn-outline dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {categories.slice(5).map((element) => (
                    <li
                      className="nav-item custom-nav-item position-relative"
                      key={element.id}
                    >
                      <Link
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        id="navbarDropdown"
                        role="button"
                        key={element.id}
                        to={
                          element.id
                            ? `/search?category_ids[]=${element.id}`
                            : "#"
                        }
                      >
                        {/* &page=1&per_page=15&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true */}
                        <span>{element.name}</span>
                        {element.childrens.length !== 0 && (
                          <IoIosArrowForward />
                        )}
                      </Link>
                      {element.childrens.length !== 0 ? (
                        <ul
                          className={`subnavs ${
                            element.childrens.length > 2 ? "columns_class" : ""
                          }`}
                        >
                          {element.childrens.map((subcat) => (
                            <li className="nav-item" key={subcat.id}>
                              <Link
                                className="nav-link submenu-heads"
                                to={
                                  subcat.id
                                    ? `/search?category_ids[]=${subcat.id}`
                                    : "#"
                                }
                              >
                                {subcat.name}
                              </Link>
                              {subcat.childrens.map((val) => (
                                <ul key={val.id}>
                                  <li className="subcats">
                                    <Link
                                      to={
                                        val.id
                                          ? `/search?category_ids[]=${val.id}`
                                          : "#"
                                      }
                                    >
                                      {val.name}
                                    </Link>
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

        <div className="navbar_right">
          <Search searchToggle={searchToggle} />
          {token ? (
            <button
              type="button"
              className="signinBtn"
              onClick={() => {
                navigate("/my-account/orders", { replace: true });
              }}
            >
              <FaUser size={20} className="theme_icon_color cursor_class" />
            </button>
          ) : (
            <button type="button" className="signinBtn" onClick={signInToggle}>
              Sign in
            </button>
          )}

          <AiOutlineHeart
            size={25}
            onClick={
              token == null ? () => setSignInModal(true) : wishListToggle
            }
            className="theme_icon_color cursor_class"
          />
          <span className="total_quantity">
            {token && wishlist && wishlist?.wishlist_count
              ? wishlist?.wishlist_count
              : 0}
          </span>
          <FiShoppingBag
            size={22}
            onClick={cartToggle}
            style={{ marginLeft: "27px" }}
            className="theme_icon_color cursor_class"
          />
          <span className="total_quantity">
            {cart?.total_quantity ? cart?.total_quantity : 0}
          </span>
        </div>
      </nav>

      {/*cart modal */}
      <CartPopup setcartModal={setcartModal} cartModal={cartModal} />
      {/* searchbar modal*/}
      <WishPopup
        wishListModal={wishListModal}
        setWishListModal={setWishListModal}
        setIsWishlisted={setIsWishlisted}
      />
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
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        signInToggle={signInToggle}
        setSignInModal={setSignInModal}
        setGuestLogin={setGuestLogin}
      />
    </>
  );
};

export default Header;
