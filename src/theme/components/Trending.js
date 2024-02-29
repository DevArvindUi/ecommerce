import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store-settings-context";
import { BASE_URL } from "../../config/api";
import Carousel from "react-multi-carousel";
import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import "react-multi-carousel/lib/styles.css";

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

const Trending = ({title}) => {
   const [products, setProducts] = useState([]);
   const navigate = useNavigate();
   const { storeSettings } = useContext(StoreContext);

   useEffect(() => {
      getProductsCall();
   }, []);

   const getProductsCall = async () => {
      try {
         const prod_response = await axios.get(`${BASE_URL}/products/filter?page=1`);
         const prod_data = prod_response.data.data;
         setProducts(prod_data);
      } catch (error) {
         if (error?.response?.data?.meta?.message === "Token expired.") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("isGuest");
            navigate("/", { replace: true });
            window.location.reload(false);
         }
      }
   };

   return (
      <div className="container-fluid position-relative section-gap">
         <div className="row">
            <div className="col-6">
               <h2 className="text-center fontMb18 mb-5">{title}</h2>
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
                  customButtonGroup={products.length > 4 && <CustomButtonGroupAsArrows />}>
                  {products?.map((product, index) => (
                     <div key={index} className="position-relative">
                        <Link className="text-decoration-none text-dark" to={product.id ? `/product/${product.name}/${product.id}` : "#"}>
                           <div className="product-image-container">
                              <img src={`${product?.gallery?.length > 0 ? product?.gallery[0]?.original : "/images/image-not-found.jpg"}`} alt={product?.name} className="category-image w-100 h-100" />
                           </div>
                        </Link>
                        <div className="d-flex justify-content-between mt-3">
                           <p className="product-title">{product.name}</p>
                           {product?.average_rating && <ReactStars count={5} value={parseFloat(product?.average_rating)} size={20} edit={false} isHalf={true} />}
                        </div>
                        <p className="text-dark fs-4 lh-sm">
                           {storeSettings.currency_code} {product?.price_with_tax}
                        </p>
                     </div>
                  ))}
               </Carousel>
            </div>
         </div>
      </div>
   );
};

export default Trending;
