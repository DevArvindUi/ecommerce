import React from "react";
import Categories from "./partials/Categories";
import Services from "./partials/Services";
import Trending from "./partials/Trending";
import BestSelling from "./partials/BestSelling";
import NewArrivals from "./partials/NewArrivals";
import Footer from "./partials/Footer";
import Banner from "./partials/Banner";
import "./standard.css";

const Standard = ({ setGuestLogin, setIsWishlisted }) => {
   return (
      <>
         <Banner />
         <Categories />
         <Trending />
         <Services />
         <BestSelling />
         <NewArrivals />
      </>
   );
};

export default Standard;
