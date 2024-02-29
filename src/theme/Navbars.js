import React, { useContext, useEffect, useRef, useState } from "react";
import DefaultNavBar from "./Default/partials/NavBar.Default";
import UltraNavBar from "./Ultra/NavBar.ultra";
import StandardNavBar from "./Standard/partials/NavBar.standard";
import { StoreContext } from "../context/store-settings-context";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "../context/CartContext";
import { useWishlistGlobalContext } from "../context/WishListContext";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { CategoriesContext } from "../context/categories-context";
import CartPopup from "../components/Cart/Cartpopup";
import WishPopup from "../components/Cart/WishPopup";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import SearchModal from "../components/Search/SearchModal";
import AppDrawer from "../components/common/AppDrawer/AppDrawer";
import "react-toastify/dist/ReactToastify.css";
import PremiumNavBar from "./Preminum/Partials/NavBar.premium";

export default function Navbars({ setIsWishlisted, setGuestLogin }) {
   //all state and variables here
   const { storeSettings } = useContext(StoreContext);
   const { cart } = useGlobalContext();
   const { wishlist } = useWishlistGlobalContext();
   const token = localStorage.getItem("auth_token");
   const { categories } = useContext(CategoriesContext);
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
   const [isScrolled, setIsScrolled] = useState(false);

   //function handler
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

   const cartToggle = () => setcartModal(true);

   const wishListToggle = () => setWishListModal(true);

   const OtpToggle = (e) => {
      e.preventDefault();
      setSignInModal(false);
      setOtpModal(true);
   };

   // useEffect here
   useEffect(() => {
      if (categories?.length > 6) {
         setfilteredCategory(categories.slice(0, 5));
      } else {
         setfilteredCategory(categories);
      }
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 10) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   const NavBar = (props) => {
      switch ("Premium" || storeSettings?.theme_template?.name) {
         case "Standard":
            return <StandardNavBar {...props} />;
         case "Ultra":
            return <UltraNavBar {...props} />;
            case "Premium":
            return <PremiumNavBar {...props} />;
         default:
            return <DefaultNavBar {...props} />;
      }
   };

   return (
      <>
         {/* modals */}
         <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />
         <CartPopup //
            setcartModal={setcartModal}
            cartModal={cartModal}
         />
         <WishPopup //
            wishListModal={wishListModal}
            setWishListModal={setWishListModal}
            setIsWishlisted={setIsWishlisted}
         />
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
         <Register //
            registerModal={registerModal}
            setRegisterModal={setRegisterModal}
            signInToggle={signInToggle}
            setSignInModal={setSignInModal}
            setGuestLogin={setGuestLogin}
         />
         {/* navbar */}
         <ToastContainer autoClose={2000} theme="colored" />
         <NavBar //
            cartToggle={cartToggle}
            searchToggle={searchToggle}
            signInToggle={signInToggle}
            wishListToggle={wishListToggle}
            navLink={navLink}
            isDesktop={isDesktop}
            categories={filteredCategory}
            isScrolled={isScrolled}
            logo={storeSettings?.logo}
            token={token}
            cart={cart}
            wishlist={wishlist}
         />
         {/* navbar */}
      </>
   );
}
