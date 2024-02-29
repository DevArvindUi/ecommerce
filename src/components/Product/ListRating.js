import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { MdStar } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { FaUserCircle } from "react-icons/fa";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import { StoreContext } from "../../context/store-settings-context";
import Pagination from "../common/Pagination/Pagination";

const ListRating = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { listReviews } = state;
  const { product_id } = listReviews;
  const { storeSettings } = useContext(StoreContext);

  //states
  const [reviews, setreviews] = useState([]);
  const [product, setproduct] = useState({});
  const [image, setimage] = useState([]);
  const [loader, setloader] = useState(false);
  const [ratingBackColor, setratingBackColor] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(3);

  // / Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = reviews
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    try {
      setloader(true);
      const response = await axios.get(`${BASE_URL}/products/${product_id}`);
      const data = response.data.data;
      setproduct(data);
      setimage(data?.gallery?.length > 0 ? data?.gallery[0]?.medium : "/images/image-not-found.jpg");
      setreviews(data.reviews);
  
      if (data.average_rating <= "2.5") {
        setratingBackColor("red");
      } else if (data.average_rating > "2.5" && data.average_rating <= "3.5") {
        setratingBackColor("orange");
      } else if (data.average_rating > "3.5") {
        setratingBackColor("green");
      }
      
      setloader(false);
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
      setloader(false);
    }
  };

  return (
    <div className="container list_ratings">
      {!loader ? (
        <div className="row my-5">
          <div className="col-lg-3 col-sm-10 view_rating_left">
            <div className="div_first">
              <Link
                to={product_id ? `/product/${product.name}/${product_id}` : "#"}
              >
                <img className="product_img" src={image} alt={product.name} />
              </Link>
              <div className="d-flex align-items-baseline mt-2 below_image">
                <div>
                  <Link
                    to={
                      product_id
                        ? `/product/${product.name}/${product_id}`
                        : "#"
                    }
                    className="text-decoration-none text-dark"
                  >
                    <h6 className="mt-3 cursor_class">{product.name}</h6>
                  </Link>
                  <span className="sell_price">
                    {storeSettings.currency_code}
                    {product.price_with_tax}
                  </span>
                  {product?.compare_price && (
                    <span className="compare_price">
                      <del>
                        {storeSettings.currency_code}
                        {product.compare_price}
                      </del>
                    </span>
                  )}
                </div>
                <div>
                  {product.average_rating != null ? (
                    <div
                      className="rating_div"
                      style={{
                        backgroundColor: ratingBackColor,
                      }}
                    >
                      {Math.round(product.average_rating * 10) / 10}
                      <MdStar style={{ marginLeft: "5px" }} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-sm-10 view_rating_right">
            <>
              {reviews.length > 0 && (
                <div className="user_rating_div ">
                  {currentPosts.map((val) => (
                    <div
                      key={val.id}
                      className="d-flex flex-column comments_user"
                    >
                      <div className="rating_user d-flex align-items-baseline">
                        <span>
                          <FaUserCircle
                            size={25}
                            style={{ marginRight: "10px" }}
                            color="gray"
                          />
                        </span>
                        <div>
                          <p style={{ marginBottom: "auto" }}>{val.user}</p>
                          <ReactStars
                            count={5}
                            value={parseFloat(val.rating)}
                            size={20}
                            edit={false}
                            isHalf={true}
                          />
                          <div className="rating_comment_div mt-3">
                            {val.comment}
                          </div>
                          <div className="reviewDate mt-3">
                            <span>{val.review_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {reviews.length > 4 && (
                <Pagination
                  currentPage={currentPage}
                  postPerPage={postPerPage}
                  totalPosts={reviews.length}
                  paginate={paginate}
                />
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}
    </div>
  );
};

export default ListRating;
