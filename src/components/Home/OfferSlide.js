import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BannerContext } from "../../context/banner-context";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const OfferSlide = () => {
  const { banner } = useContext(BannerContext);

  return (
    <React.Fragment>
      {banner.map((bannerImg) => {
        return bannerImg.name === "middle" ? (
          <Carousel
            key={bannerImg.id}
            swipeable={true}
            draggable={false}
            responsive={responsive}
            autoPlay={false}
            shouldResetAutoplay={false}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {bannerImg.banner_items.map((img, index) => {
              return bannerImg.banner_items.length > 0 ? (
                <div key={index} className="middle_banner">
                  <img src={img} alt={bannerImg.name} className="ca_img" />
                </div>
              ) : (
                <div key={index} className="middle_banner">
                  <img
                    src="/images/banner-1.jpg"
                    alt="middleBanner"
                    className="ca_img"
                  />
                </div>
              );
            })}
          </Carousel>
        ) : (
          ""
        );
      })}
    </React.Fragment>
  );
};

export default OfferSlide;
