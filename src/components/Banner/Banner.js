import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BannerContext } from "../../context/banner-context";

const Banner = () => {
  const { banner } = useContext(BannerContext);

  return (
    <div className="banner_slider">
      {banner.map((bannerImg) => {
        return bannerImg.name === "top" ? (
          <Carousel
            key={bannerImg.id}
            emulateTouch={true}
            showArrows={false}
            infiniteLoop={true}
          >
            {bannerImg.banner_items.map((img, index) => {
              return bannerImg.banner_items.length > 0 ? (
                <img src={img} alt={bannerImg.name} key={index} />
              ) : (
                <img
                  src="/images/slider/banner-1.jpg"
                  alt="banner"
                  key={index}
                />
              );
            })}
          </Carousel>
        ) : (
          ""
        );
      })}
    </div>
  );
};
export default Banner;
