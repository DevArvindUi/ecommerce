import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import GlobalCSS from "./globalStyles.css";
import ScrollToTop from "react-scroll-to-top";

//context import
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishListContext";
import OptionContextProvider from "./context/optiontypes-context";
import StoreContextProvider from "./context/store-settings-context";
import CategoriesContextProvider from "./context/categories-context";
import BrandContextProvider from "./context/brand-context";

//components import
// import Footer from "./components/common/Footer/Footer";
import Home from "../src/components/Home/Home";
import ProductsByCategory from "./components/Product/ProductsByCategory";
import SingleProduct from "./components/Product/SingleProduct";
import Myaccount from "./components/Myaccount/Myaccount";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopRoute from "./components/ScrollToTopRoute";
import Checkout from "./components/Checkout/Checkout";
import CheckoutProtected from "./components/CheckoutProtected";
import Order from "./components/Myaccount/Order";
import Accountupdate from "./components/Myaccount/Accountupdate";
import OrderSuccess from "./components/Checkout/OrderSuccess";
import OrderDetails from "./components/Myaccount/OrderDetails";
import Address from "./components/Myaccount/Address";
import BannerContextProvider from "./context/banner-context";
import Contactus from "./components/LandingPages/Contactus";
import Faq from "./components/LandingPages/Faq";
import RateProduct from "./components/Product/RateProduct";
import ListRating from "./components/Product/ListRating";
import PageBySlug from "./components/LandingPages/PageBySlug";
import NotFound from "./components/common/NotFound/NotFound";
import ProductsContextProvider from "./context/products-context";
// import NavBar from "./components/common/Navbar/NavBar";
import OrderStatus from "./components/Checkout/OrderStatus";
import Footer from "./theme/Standard/partials/Footer";
import Navbars from "./theme/Navbars";

function App() {
   const [isLoading, setIsLoading] = React.useState(true);
   const [isWishlisted, setIsWishlisted] = React.useState(false);
   const [guestLogin, setGuestLogin] = React.useState(true);

   const handleLoading = () => {
      setTimeout(() => {
         setIsLoading(false);
      }, 1000);
   };

   useEffect(() => {
      window.addEventListener("load", handleLoading);
      return () => window.removeEventListener("load", handleLoading);
   }, []);

   const Loader = () => (
      <div className="divLoader">
         <svg className="svgLoader" viewBox="0 0 100 100" width="6em" height="6em">
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#000000" transform="rotate(179.719 50 51)">
               <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
            </path>
         </svg>
      </div>
   );

   return !isLoading ? (
      <React.Fragment>
         <Router>
            <ScrollToTopRoute />
            {/* <NavBar
          setIsWishlisted={setIsWishlisted}
          setGuestLogin={setGuestLogin}
        />
        <NavBar setIsWishlisted={setIsWishlisted} setGuestLogin={setGuestLogin} /> */}
            <Navbars setIsWishlisted={setIsWishlisted} setGuestLogin={setGuestLogin} />
            <main className="mx-auto">
               <Routes>
                  <Route
                     path="/"
                     element={
                        <BannerContextProvider>
                           <Home setIsWishlisted={setIsWishlisted} setGuestLogin={setGuestLogin} />
                        </BannerContextProvider>
                     }></Route>
                  <Route
                     path="/search"
                     element={
                        <BrandContextProvider>
                           <OptionContextProvider>
                              <ProductsContextProvider>
                                 <ProductsByCategory />
                              </ProductsContextProvider>
                           </OptionContextProvider>
                        </BrandContextProvider>
                     }
                  />
                  <Route
                     path="/search?:params"
                     element={
                        <BrandContextProvider>
                           <OptionContextProvider>
                              <ProductsContextProvider>
                                 <ProductsByCategory />
                              </ProductsContextProvider>
                           </OptionContextProvider>
                        </BrandContextProvider>
                     }
                  />
                  <Route path="/rate-product/:id" element={<RateProduct />} />
                  <Route path="/view-ratings-reviews/:id" element={<ListRating />} />
                  <Route path="/product/:name/:id" element={<SingleProduct setIsWishlisted={setIsWishlisted} isWishlisted={isWishlisted} />} />
                  <Route path="/contact-us" element={<Contactus />} />
                  <Route path="/faqs" element={<Faq />} />

                  <Route path="/checkout" element={<CheckoutProtected />}>
                     <Route path="/checkout" element={<Checkout guestLogin={guestLogin} setGuestLogin={setGuestLogin} />} />
                  </Route>

                  <Route path="/my-account" element={<ProtectedRoute />}>
                     <Route path="/my-account" element={<Myaccount />}>
                        <Route path="orders">
                           <Route index element={<Order />} />
                           <Route path=":id" element={<OrderDetails />} />
                        </Route>
                        <Route path="details" element={<Accountupdate />} />
                        <Route path="address" element={<Address />} />
                     </Route>
                  </Route>
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/order-status" element={<OrderStatus />} />
                  <Route path="/order-details/:id" element={<OrderDetails />} />
                  <Route path="/get-to-know-us/:slug" element={<PageBySlug />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </main>
            <Footer />
         </Router>
         <div className="scroll_button">
            <ScrollToTop top smooth width="20" height="20" viewBox="0 0 256 256" />
         </div>
      </React.Fragment>
   ) : (
      <Loader />
   );
}

ReactDOM.render(
   <>
      <GlobalCSS />

      <CategoriesContextProvider>
         <ProductsContextProvider>
            <StoreContextProvider>
               <CartProvider>
                  <WishlistProvider>
                     <App />
                  </WishlistProvider>
               </CartProvider>
            </StoreContextProvider>
         </ProductsContextProvider>
      </CategoriesContextProvider>
   </>,
   document.getElementById("root")
);
