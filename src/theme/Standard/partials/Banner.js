import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BannerContext } from "../../../context/banner-context";
import { CategoriesContext } from "../../../context/categories-context";
import { Link } from "react-router-dom";

const Banner = () => {
   const { banner } = useContext(BannerContext);
   const { categories } = useContext(CategoriesContext);
   return (
      <div className="banner_slider position-relative">
         {banner.map((bannerImg) => {
            return bannerImg.name === "top" ? (
               <Carousel key={bannerImg.id} emulateTouch={true} showArrows={false} infiniteLoop={true} autoPlay={true} interval={3000}>
                  {bannerImg.banner_items.map((img, index) => {
                     return bannerImg.banner_items.length > 0 ? <img src={img} alt={bannerImg.name} key={index} /> : <img src="/images/slider/banner-1.jpg" alt="banner" key={index} />;
                  })}
               </Carousel>
            ) : (
               ""
            );
         })}
         <div className="gap-5 position-absolute categories-button d-none d-sm-none d-md-flex">
            {categories.map((category) => (
               <Link key={category.id} to={category.id ? `/search?category_ids[]=${category.id}` : "#"} className="text-decoration-none text-dark">
                  <span key={category.id} className="text-white fs-5 text-uppercase fw-bold border-bottom border-4 px-3 cursor_class">
                     {category.name}
                  </span>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Banner;
