import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { TailSpin } from "react-loader-spinner";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { CategoriesContext } from "../../context/categories-context";
import { StoreContext } from "../../context/store-settings-context";
import { OptionContext } from "../../context/optiontypes-context";
import { BrandContext } from "../../context/brand-context";
import { FilterModel } from "./FilterModel";
import Register from "../auth/Register";
import Filtering from "./Filtering";
import Login from "../auth/Login";
import Sorting from "./Sorting";

const ProductsByCategory = () => {
  const [getSelectedData, setSelectedData] = useState([]);
  const [metaInfo, setMetaInfo] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dropdownmenu, setdropdownmenu] = useState("Sort");
  const [filterModel, setfilterModel] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [OtpModal, setOtpModal] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const token = localStorage.getItem("auth_token");
  const { categories } = useContext(CategoriesContext);
  const { brand } = useContext(BrandContext);
  const { optiontypes } = useContext(OptionContext);
  const { storeSettings } = useContext(StoreContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useWishlistGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageNumber(1);
    checkSelectedCat();
  }, [location.search]);

  useEffect(() => {
    if (searchParams) {
      fetchProducts();
    }
  }, [searchParams, pageNumber]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchProducts = async () => {
    let response;
    if (searchParams !== "all_products=") {
      try {
        response = await axios.get(
          `${BASE_URL}/products/filter?${searchParams}&page=${pageNumber}`
        );
      } catch (error) {
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      }
    } else {
      try {
        response = await axios.get(
          `${BASE_URL}/products/filter?page=${pageNumber}`
        );
      } catch (error) {
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      }
    }

    const responseData = response.data.data;
    const metaResponse = response.data.meta;
    pageNumber > 1
      ? setSelectedData((prevData) => [...prevData, ...responseData])
      : setSelectedData(responseData);
    setMetaInfo(metaResponse);
    setLoading(false);
  };

  const fetchMoreData = () => {
    if (metaInfo.current_page === metaInfo.total_pages) {
      return;
    } else {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  };

  const checkSelectedCat = () => {
    scrollToTop();
    categories.some((e) => {
      if (e.checked === true) {
        e.checked = false;
      }
    });

    let urlSearch = new URLSearchParams(location.search);
    setSearchParams(decodeURIComponent(urlSearch.toString()));
    let catIdsArray = urlSearch.get("category_ids[]")?.split(",");
    if (catIdsArray?.length > 0) {
      catIdsArray.map((cat) => {
        categories.forEach((ele) => {
          if (ele?.id === +cat) {
            ele["checked"] = true;
          }
        });
      });
    }
  };

  //checkbox handle change function
  const oninputChange = (target, cat_id) => {
    setLoading(true);
    setPageNumber(1);
    let params = "";
    var c_p = "";
    var b_p = "";
    var o_p = "";

    //category filter start
    if (target.name === "category") {
      categories.forEach((element) => {
        if (element.id === cat_id) {
          element["checked"] = target.checked;
        }
      });
    }
    //Concat params
    categories.forEach((paramselement) => {
      if (paramselement.checked) {
        c_p = c_p + "category_ids[]=" + paramselement.id + "&";
      }
    });
    //category filter end

    //brand filter start
    if (target.name === "brand") {
      brand.forEach((element) => {
        if (element.id === cat_id) {
          element["checked"] = target.checked;
        }
      });
    }

    brand.forEach((paramselement) => {
      if (paramselement.checked) {
        b_p = b_p + "brand_ids[]=" + paramselement.id + "&";
      }
    });

    //brand filter end

    //option value filter start
    if (target.name === "option1") {
      optiontypes.forEach((element) => {
        element.option_values.forEach((value) => {
          if (value.id === cat_id) {
            value["checked"] = target.checked;
          }
        });
      });
    }

    optiontypes.forEach((paramselement) => {
      paramselement.option_values.forEach((params_e) => {
        if (params_e.checked) {
          o_p = o_p + "option_value_ids[]=" + params_e.id + "&";
        }
      });
    });
    //option value filter end
    params = c_p + b_p + o_p;
    let urlSearch = new URLSearchParams(location.search);
    urlSearch.delete("all_products");
    urlSearch.delete("category_ids[]");
    urlSearch.append(params, ",");
    let newUrl;
    if (params === "") {
      setSearchParams("all_products");
      newUrl = `${window.location.origin}${window.location.pathname}?all_products`;
      window.history.replaceState(null, "", newUrl);
    } else {
      newUrl = `${window.location.origin}${
        window.location.pathname
      }?${decodeURIComponent(urlSearch).toString()}`;
      window.history.replaceState(null, "", newUrl);
      setSearchParams(params);
    }
    scrollToTop();
  };

  const sortAscDsc = (type) => {
    let urlSearch = new URLSearchParams(searchParams);
    urlSearch.delete("sort_by");
    urlSearch.append("sort_by", type);
    const updatedSearchParams = decodeURIComponent(urlSearch).toString();
    let newUrl = `${window.location.origin}${window.location.pathname}?${updatedSearchParams}`;
    window.history.replaceState(null, "", newUrl);
    setPageNumber(1);
    setSearchParams(updatedSearchParams);
  };

  //clear filter functionality
  const clearFilter = () => {
    setPageNumber(1);
    scrollToTop();
    const urlParams = new URLSearchParams();
    urlParams.set("all_products", "");

    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${urlParams.toString()}`;
    window.history.replaceState(null, "", newUrl);

    setSearchParams("all_products");

    categories.forEach((catobj) => {
      if (catobj.checked === true) {
        catobj.checked = false;
      }
    });
    optiontypes.forEach((option) => {
      option.option_values.forEach((ele) => {
        if (ele.checked === true) {
          ele.checked = false;
        }
      });
    });

    brand.forEach((b) => {
      if (b.checked === true) {
        b.checked = false;
      }
    });
  };

  const filterToggle = () => {
    setfilterModel(true);
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

  const OtpToggle = (e) => {
    e.preventDefault();
    setSignInModal(false);
    setOtpModal(true);
  };

  const removeWish = (prod_id) => {
    let result = wishlist?.wishlist_items.filter(
      (ele) => ele?.product_id === prod_id
    );
    removeFromWishlist(result[0]?.id);
  };

  const addToWish = (item_id, item_type) => {
    let wishlistInput = {
      item_id: item_id,
      item_type: item_type,
    };

    addToWishlist(wishlistInput);
  };

  return (
    <React.Fragment>
      <div className="product_container container_fluid">
        {/* for mobile */}
        <div className="row sort_filter_mobile">
          <div className="col-12 ">
            <div className="filter_mobile">
              <Sorting dropdownmenu={dropdownmenu} sortAscDsc={sortAscDsc} />

              <FilterModel
                filterModel={filterModel}
                setfilterModel={setfilterModel}
                filterToggle={filterToggle}
                categories={categories}
                brand={brand}
                optiontypes={optiontypes}
                oninputChange={oninputChange}
                clearFilter={clearFilter}
              />
            </div>
          </div>
        </div>
        {/* for mobile */}

        {/* for desktop */}
        <div className="row desktop_filtering">
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 sort_filter_desktop">
            <Filtering
              categories={categories}
              brand={brand}
              optiontypes={optiontypes}
              oninputChange={oninputChange}
              clearFilter={clearFilter}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-xs-12">
            <div className="sort_filter_desktop">
              <Sorting dropdownmenu={dropdownmenu} sortAscDsc={sortAscDsc} />
            </div>

            {!loading ? (
              <>
                {getSelectedData.length > 0 ? (
                  <div>
                    <InfiniteScroll
                      dataLength={getSelectedData.length}
                      next={fetchMoreData}
                      hasMore={
                        metaInfo.current_page < metaInfo.total_pages
                          ? true
                          : false
                      }
                      loader={
                        <TailSpin color="#000000" height={60} width={60} />
                      }
                      className="row"
                      scrollThreshold={0.35} // Adjust this value as needed (e.g., 0.9 means 90% scroll height)
                    >
                      {getSelectedData.map((product) => (
                        <div
                          className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 position-relative"
                          key={product.id}
                        >
                          <div className="card border-0 mb-5 onproducthover">
                            <Link
                              to={
                                product.id
                                  ? `/product/${product.name}/${product.id}`
                                  : "#"
                              }
                            >
                              <img
                                key={product?.gallery[0]?.id}
                                className={`card-img-top img_div ${
                                  product?.gallery?.length === 0 &&
                                  "no-image-found"
                                }`}
                                src={`${
                                  product?.gallery?.length > 0
                                    ? product?.gallery[0]?.medium
                                    : "/images/image-not-found.jpg"
                                }`}
                                alt={product?.name}
                              />
                            </Link>
                            <div className="wishlist_product_div">
                              {wishlist?.wishlist_items?.some(
                                (ele) => ele.product_id === product?.id
                              ) ? (
                                <AiFillHeart
                                  size={20}
                                  className="wishlist_fill_icon"
                                  onClick={() => removeWish(product?.id)}
                                />
                              ) : (
                                <AiOutlineHeart
                                  size={20}
                                  className="theme_icon_color"
                                  onClick={
                                    token == null
                                      ? () => setSignInModal(true)
                                      : () => addToWish(product?.id, "Product")
                                  }
                                />
                              )}
                            </div>
                            <div className="card-body product_body">
                              <Link
                                to={
                                  product.id
                                    ? `/product/${product.name}/${product.id}`
                                    : "#"
                                }
                                className="text-decoration-none text-dark"
                              >
                                <h5 className="card-title">{product.name}</h5>
                              </Link>

                              <span className="fw-bold text-muted">
                                {storeSettings.currency_code}{" "}
                                {product.price_with_tax}
                              </span>
                              {product?.compare_price && (
                                <span className="m-2 text-muted">
                                  <del>
                                    {storeSettings.currency_code}
                                    {product.compare_price}
                                  </del>
                                </span>
                              )}

                              {product.average_rating ? (
                                <ReactStars
                                  count={5}
                                  value={parseFloat(product.average_rating)}
                                  size={20}
                                  edit={false}
                                  isHalf={true}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </InfiniteScroll>
                  </div>
                ) : (
                  <div className="notFound_div">
                    <h4>Sorry!! No Products found</h4>
                  </div>
                )}
              </>
            ) : (
              <div className="load_spinner">
                <TailSpin color="#000000" height={60} width={60} />
              </div>
            )}
          </div>
        </div>
        {/* for desktop */}
      </div>
      {/* signin modal */}
      <Login
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        registerToggle={registerToggle}
        signInToggle={signInToggle}
        OtpToggle={OtpToggle}
        OtpModal={OtpModal}
        setOtpModal={setOtpModal}
      />

      {/*  register modal start*/}
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        signInToggle={signInToggle}
        setSignInModal={setSignInModal}
      />
    </React.Fragment>
  );
};
export default ProductsByCategory;
