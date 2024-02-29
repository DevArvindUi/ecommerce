import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { CategoriesContext } from "../../context/categories-context";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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
const ShopbyCategory = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      {categories.length > 5 ? (
        <div className="shopCategory">
          <Carousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            shouldResetAutoplay={true}
            ssr={true}
            infinite={false}
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            renderArrowsWhenDisabled={true}
          >
            {categories.map((cat) => {
              return (
                <div
                  className="d-flex flex-column align-items-center cat_div"
                  key={cat.id}
                >
                  <Link
                    to={
                      cat.id
                        ? `/search?category_ids[]=${cat.id}`
                        : "#"
                    }
                    className="text-decoration-none text-dark"
                  >
                    <img src={cat?.image ? cat?.image : "/images/image-not-found.jpg"} alt={cat.name} className="catImage" />
                  </Link>
                  <span className="image_overlay">
                    <BiLink size={40} className="link_icon" />
                  </span>
                  <p className="catName">{cat.name}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <>
          <div className="shopCategory without_carousel_desktop">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={
                  cat.id
                    ? `/search?category_ids[]=${cat.id}`
                    : "#"
                }
                className="text-decoration-none text-dark"
              >
                <div className="d-flex flex-column align-items-center cat_main_div">
                  <div className="cat_div">
                    <img src={cat?.image ? cat?.image : "/images/image-not-found.jpg"} alt={cat.name} className="catImage" />
                  </div>
                  <span className="image_overlay">
                    <BiLink size={40} className="link_icon" />
                  </span>
                  <p className="catName">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="shopCategory without_carousel_mobile">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={
                  cat.id
                    ? `/search?category_ids[]=${cat.id}`
                    : "#"
                }
                className="text-decoration-none text-dark"
              >
                <div className="d-flex flex-column align-items-center cat_main_div">
                  <div className="cat_div">
                    <img src={cat?.image ? cat?.image : "/images/image-not-found.jpg"} alt={cat.name} className="catImage" />
                  </div>
                  <span className="image_overlay">
                    <BiLink size={40} className="link_icon" />
                  </span>
                  <p className="catName">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ShopbyCategory;
