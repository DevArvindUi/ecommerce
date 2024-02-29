import React, { useContext } from "react";
import { CategoriesContext } from "../../../context/categories-context";
import Carousel from "react-multi-carousel";
import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const responsive = {
   superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
   },
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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

const CustomButtonGroupAsArrows = ({ next, previous, goToSlide, ...rest }) => {
   const {
      carouselState: { currentSlide },
   } = rest;
   return (
      <div className="carousel-button-group position-absolute d-flex gap-2 cursor_class carouselBtnMob">
         <IoArrowBackCircleSharp size={30} className={currentSlide === 0 ? "disable" : ""} onClick={() => previous()} />
         <IoArrowForwardCircleSharp size={30} onClick={() => next()} />
      </div>
   );
};
const Categories = () => {
   const { categories } = useContext(CategoriesContext);
   return (
      <div className="container-fluid position-relative section-gap">
         <div className="row mb-5">
            <div className="col-6">
               <h2 className="text-center fontMb18">Shop By Categories</h2>
            </div>
         </div>
         <div className="row">
            <div className="col-12 mt-4">
               <Carousel
                  swipeable={true}
                  draggable={false}
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  shouldResetAutoplay={true}
                  ssr={true}
                  arrows={false}
                  infinite={false}
                  keyBoardControl={true}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  renderButtonGroupOutside
                  customButtonGroup={categories.length > 4 && <CustomButtonGroupAsArrows />}>
                  {categories.map((category, index) => (
                     <Link key={category.id} to={category.id ? `/search?category_ids[]=${category.id}` : "#"} className="text-decoration-none text-dark">
                        <div key={index} className="position-relative category-container">
                           <div className="position-absolute w-100 h-100 top-0 start-0 rounded-circle bg-dark opacity-50"></div>

                           <img src={category.image} className="rounded-circle category-image w-100 h-100 object-fit-cover" alt={category.name} />
                           <span className="position-absolute top-50 start-50 translate-middle text-uppercase fs-5 fw-bold text-white">{category.name}</span>
                        </div>
                     </Link>
                  ))}
               </Carousel>
            </div>
         </div>
      </div>
   );
};

export default Categories;
