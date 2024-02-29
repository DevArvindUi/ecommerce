import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Accordion } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Tooltip from "react-bootstrap/Tooltip";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../context/CartContext";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { StoreContext } from "../../context/store-settings-context";
import CartPopup from "../Cart/Cartpopup";
import { toast } from "react-toastify";

//context import

const SingleProduct = ({ setIsWishlisted }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const { storeSettings } = useContext(StoreContext);
  const { cart, Increase, Decrease, addItemToCart } = useGlobalContext();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useWishlistGlobalContext();
  const [count, setCount] = useState(1);
  const [productType, setProductType] = useState("");
  const [productData, setproductData] = useState({});
  const [variationsData, setVariationsData] = useState([]);
  const [galleryImg, setGalleryImg] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [skuName, setSkuName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sellPrice, setSellprice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [loader, setLoader] = useState(false);
  const [ProdVarId, setProdVarId] = useState("");
  const [variantId, setvariantId] = useState("");
  const [ratingBackColor, setratingBackColor] = useState("");
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [signInModal, setSignInModal] = useState(false); //login
  const [registerModal, setRegisterModal] = useState(false); //register
  const [OtpModal, setOtpModal] = useState(false); //otp
  const [cartModal, setcartModal] = useState(false); //cart

  const cartInput = {
    item_id: ProdVarId,
    item_type: productType,
    quantity: count,
  };

  const wishlistInput = {
    item_id: ProdVarId,
    item_type: productType,
  };

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  const getSingleProduct = async (id) => {
    setLoader(true);
    try {
      const headers = { Authorization: `${token}` };
      let res;
      if (token == null) {
        res = await axios.get(`${BASE_URL}/products/${id}`);
      }
      if (token != null) {
        res = await axios.get(`${BASE_URL}/products/${id}`, { headers });
        setIsWishlisted(res.data.data.is_wishlisted);
      }
      const data = res.data.data;
      setproductData(data);
      setWishlistItemId(data?.wishlist_item_id);
      setProductType("product");
      setProdVarId(id);
      setSkuName(data.sku);
      setBrandName(data.brand_name);
      setSellprice(data.price_with_tax);
      setComparePrice(data.compare_price);
      setVariationsData(data.variants);
      setGalleryImg(
        data?.gallery?.length > 0
          ? data?.gallery[0]?.original
          : "/images/image-not-found.jpg"
      );
      setGalleryData(data?.gallery);
      setTimeout(() => {
        setLoader(false);
      }, 500);
      if (data.average_rating <= "2.5") {
        setratingBackColor("red");
      }
      if (data.average_rating > "2.5" && data.average_rating <= "3.5") {
        setratingBackColor("orange");
      }
      if (data.average_rating > "3.5") {
        setratingBackColor("green");
      }
    } catch (error) {
      setLoader(false);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
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

  const changeProductImage = (img_path) => {
    setGalleryImg(img_path);
  };

  const changeVariant = (gallery, SKU, s_price, c_price, id) => {
    setProdVarId(id);
    setProductType("variant");
    setGalleryImg(gallery[0]?.original);
    setGalleryData(gallery);
    setSkuName(SKU);
    setSellprice(s_price);
    setComparePrice(c_price);
    setvariantId(id);
    setCount(1);
  };

  //increase cart count
  const increaseCount = () => {
    setCount((count) => count + 1);
  };

  //decrease cart count
  const decreaseCount = () => {
    if (count === 1) {
      return;
    } else {
      setCount((count) => count - 1);
    }
  };

  const RenderQuantityFromCart = ({ icon, type }) => {
    const hasVariant = productType === "variant";
    const items = cart?.cart_items || [];

    const handleClick = (id, quantity) => {
      if (type === "decrease") {
        Decrease(id, quantity);
      } else if (type === "increase") {
        Increase(id, quantity);
      }
    };

    const handleDefaultClick = () => {
      if (type === "decrease") {
        decreaseCount();
      } else if (type === "increase") {
        increaseCount();
      }
    };

    const filteredItems = items.filter((item) =>
      hasVariant
        ? item?.variant && item?.variant?.id === variantId
        : !item?.variant && item?.product_id === productData.id
    );

    return (
      <>
        {filteredItems.length > 0 ? (
          filteredItems.map((val) => (
            <button
              key={hasVariant ? val?.variant?.id : val?.id}
              onClick={() => handleClick(val?.id, val?.quantity)}
            >
              {icon}
            </button>
          ))
        ) : (
          <button onClick={handleDefaultClick}>{icon}</button>
        )}
      </>
    );
  };

  const getQuantity = () => {
    if (cart && cart?.cart_items?.length > 0) {
      if (productType === "variant") {
        let filteredItems = cart?.cart_items?.filter(
          (item) => item?.variant && item?.variant?.id === variantId
        );
        return filteredItems.length > 0 ? (
          filteredItems.map((ele) => (
            <div key={ele?.variant?.id}>{ele.quantity}</div>
          ))
        ) : (
          <div>{count > 1 ? count : 1}</div>
        );
      } else {
        let filteredItems = cart?.cart_items?.filter(
          (item) => !item?.variant && item?.product_id === productData?.id
        );
        return filteredItems.length > 0 ? (
          filteredItems.map((ele) => (
            <div key={ele?.product_id}>{ele.quantity}</div>
          ))
        ) : (
          <div>{count > 1 ? count : 1}</div>
        );
      }
    } else {
      return <div>{count > 1 ? count : 1}</div>;
    }
  };

  const addProductToCart = () => {
    if (variationsData.length === 0) {
      addItemToCart(cartInput);
      setCount(1);
    } else {
      if (productType === "variant") {
        addItemToCart(cartInput);
        setCount(1);
      } else {
        toast.info("Please select a variant first");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="single_product row mt-4">
        {!loader ? (
          <>
            <div className="mt-4 col-lg-5 col-md-5 col-sm-12 col-xs-12">
              <div className="row left_row">
                <div className="col-sm-3">
                  <div className="style-thumbnails-block">
                    {galleryData.map((path, index) => (
                      <div
                        className="style-thumbnails"
                        key={index}
                        onClick={() => changeProductImage(path.original)}
                      >
                        <img
                          src={
                            path?.thumbnail
                              ? path?.thumbnail
                              : "/images/image-not-found.jpg"
                          }
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ background: "#f8f8f8", height: "max-content" }}
                >
                  <img
                    src={
                      galleryImg ? galleryImg : "/images/image-not-found.jpg"
                    }
                    alt="galleryImage"
                    style={{ width: "95%" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="col-lg-7 col-md-7 col-sm-12 col-xs-12"
              style={{ padding: "22px" }}
            >
              <div className="single_product_description my-3">
                <div className="d-flex flex-row align-items-start">
                  <h3 className="mb-4">{productData.name}</h3>
                  {productData.average_rating != null ? (
                    <div
                      className="rating_div"
                      style={{ backgroundColor: ratingBackColor }}
                    >
                      {Math.round(productData.average_rating * 10) / 10}
                      <MdStar style={{ marginLeft: "5px" }} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <span className="sell_price">
                  {storeSettings?.currency_code} {sellPrice}
                </span>
                {comparePrice && (
                  <span className="compare_price">
                    <del>
                      {storeSettings?.currency_code} {comparePrice}
                    </del>
                  </span>
                )}
                <hr />

                {variationsData.length !== 0 ? (
                  <>
                    <div className="thumbnails-products">
                      <span>Variants: </span>
                      <div className="thumbnails-products-blocks">
                        {variationsData?.map(
                          (items, index) => (
                            <div
                              className="thumbnails-images"
                              key={index}
                              onClick={() =>
                                changeVariant(
                                  items.gallery,
                                  items.sku,
                                  items.price_with_tax,
                                  items.compare_price,
                                  items.id
                                )
                              }
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>
                                    {items.attributes.map((data, index) => (
                                      <div key={index}>
                                        {data.option_type}: {data.option_value}
                                      </div>
                                    ))}
                                  </Tooltip>
                                )}
                                placement="top"
                              >
                                <img
                                  src={
                                    items?.image?.thumbnail
                                      ? items?.image?.thumbnail
                                      : "/images/image-not-found.jpg"
                                  }
                                  className={`${
                                    productType === "variant" &&
                                    variantId === items.id &&
                                    "selected_variant"
                                  }`}
                                  alt="img"
                                />
                              </OverlayTrigger>
                            </div>
                          )
                          // ) : null
                        )}
                      </div>
                    </div>
                    <hr />
                  </>
                ) : null}

                {productData.stock_qty > 0 ? (
                  <div className="displayFlex alignItemCenter gap_15">
                    <div className="count_buttons">
                      <RenderQuantityFromCart
                        icon={<GrSubtract />}
                        type="decrease"
                      />
                      {getQuantity()}
                      <RenderQuantityFromCart
                        icon={<GrAdd />}
                        type="increase"
                      />
                    </div>

                    {productType === "variant" ? (
                      cart &&
                      cart?.cart_items?.length > 0 &&
                      cart?.cart_items.some(
                        (ele) => ele?.variant && ele?.variant?.id === variantId
                      ) ? (
                        <button
                          style={{
                            padding: "10px 40px",
                          }}
                          className="theme_button borderRadius_10"
                          onClick={() => setcartModal(true)}
                        >
                          <IoMdCart size={22}/> Go to Cart
                        </button>
                      ) : (
                        <button
                          style={{
                            padding: "10px 40px",
                          }}
                          className="theme_button borderRadius_10"
                          onClick={() => {
                            addItemToCart(cartInput);
                            setCount(1);
                          }}
                        >
                          <IoMdCart size={22}/> Add to Cart
                        </button>
                      )
                    ) : cart &&
                      cart?.cart_items?.length > 0 &&
                      cart?.cart_items.some(
                        (ele) =>
                          !ele?.variant &&
                          ele?.product_id &&
                          ele?.product_id === productData?.id
                      ) ? (
                      <button
                        style={{
                          padding: "10px 40px",
                        }}
                        className="theme_button borderRadius_10"
                        onClick={() => setcartModal(true)}
                      >
                        <IoMdCart size={22}/> Go to Cart
                      </button>
                    ) : (
                      <button
                        style={{
                          padding: "10px 40px",
                        }}
                        className="theme_button borderRadius_10"
                        onClick={addProductToCart}
                      >
                        <IoMdCart size={22}/> Add to Cart
                      </button>
                    )}

                    <div>
                      {productType === "variant" ? (
                        wishlist &&
                        wishlist?.wishlist_items?.length > 0 &&
                        wishlist.wishlist_items.some(
                          (ele) => ele?.item?.id === variantId
                        ) ? (
                          <AiFillHeart
                            size={40}
                            className="wishlist_fill_icon cursor_class"
                            onClick={
                              token == null
                                ? () => setSignInModal(true)
                                : () => {
                                    const item = wishlist.wishlist_items.find(
                                      (ele) => ele?.item?.id === variantId
                                    );
                                    if (item) {
                                      removeFromWishlist(item.id);
                                    }
                                  }
                            }
                          />
                        ) : (
                          <AiOutlineHeart
                            size={40}
                            className="theme_icon_color cursor_class"
                            onClick={
                              token == null
                                ? () => setSignInModal(true)
                                : ()=>addToWishlist(wishlistInput)
                            }
                          />
                        )
                      ) : wishlist &&
                        wishlist?.wishlist_items?.length > 0 &&
                        wishlist.wishlist_items.some(
                          (ele) => ele?.item?.id === productData?.id
                        ) ? (
                        <AiFillHeart
                          size={40}
                          className="wishlist_fill_icon cursor_class"
                          onClick={
                            token == null
                                ? () => setSignInModal(true)
                                : () => {
                                    const item = wishlist.wishlist_items.find(
                                      (ele) => ele?.item?.id === productData?.id
                                    );
                                    if (item) {
                                      removeFromWishlist(item.id, setIsWishlisted);
                                    }
                                  }
                          }
                        />
                      ) : (
                        <AiOutlineHeart
                          size={40}
                          className="theme_icon_color cursor_class"
                          onClick={
                            token == null
                                ? () => setSignInModal(true)
                                : ()=>addToWishlist(wishlistInput, setIsWishlisted, setWishlistItemId)
                          }
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="outstock">
                    <ImCross color="red" /> <span>Out of stock</span>
                  </div>
                )}

                <hr />
                {skuName && (
                  <div className="productInfo-titles my-3 py-2">
                    <h6>SKU:</h6>
                    <span> {skuName}</span>
                  </div>
                )}

                {brandName && (
                  <div className="productInfo-titles my-3 py-2">
                    <h6>Brand:</h6>
                    <span> {brandName}</span>
                  </div>
                )}

                {productData?.categories &&
                  productData?.categories?.length > 0 && (
                    <div className="productInfo-titles my-3 py-2">
                      <h6>Category:</h6>
                      {productData?.categories?.join(", ")}
                      <span> </span>
                    </div>
                  )}

                <hr />
              </div>
              {productData?.properties &&
                productData?.properties?.length > 0 && (
                  <>
                    <table className="w-100">
                      <tbody>
                        {productData?.properties?.map(
                          (property) =>
                            property?.show_property && (
                              <tr className="align-baseline">
                                <td className="w-25 fw-bold">
                                  {property.name}
                                </td>
                                <td className="w-75">{property.value}</td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                    <hr />
                  </>
                )}

              {productData?.description && (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Product Details</Accordion.Header>
                    <Accordion.Body>
                      <div className="properties-section">
                        <p
                          className="mt-3"
                          dangerouslySetInnerHTML={{
                            __html: productData.description,
                          }}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <hr />
                </Accordion>
              )}
            </div>
          </>
        ) : (
          <div className="load_spinner">
            <TailSpin color="#000000" height={60} width={60} />
          </div>
        )}
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

      {/* Cart modal start */}
      <CartPopup setcartModal={setcartModal} cartModal={cartModal} />
    </React.Fragment>
  );
};

export default SingleProduct;
