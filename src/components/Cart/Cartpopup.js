import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdOutlineClose } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "../../context/CartContext";
import { StoreContext } from "../../context/store-settings-context";

//components import
import Login from "../auth/Login";
import Register from "../auth/Register";

const CartPopup = ({ setcartModal, cartModal }) => {
  const { cart, Increase, Decrease, remove } = useGlobalContext();
  const { storeSettings } = useContext(StoreContext);
  const navigate = useNavigate();

  //states
  const [signInModal, setSignInModal] = useState(false); //login modal
  const [registerModal, setRegisterModal] = useState(false); //register modal
  const [blurClass, setblurClass] = useState(false);

  // ######### open login modal ########
  const signInToggle = () => {
    setRegisterModal(false);
    setSignInModal(true);
  };

  // ######### open register modal ########
  const registerToggle = () => {
    setSignInModal(false);
    setRegisterModal(true);
  };

  // ######## move to checkout page #######
  const Checkout = () => {
    setcartModal(false);
    navigate("/checkout", { replace: true });
  };

  // ###### move to product details page #######
  const getProductDetails = (id, name) => {
    setcartModal(false);
    navigate(`/product/${name}/${id}`);
  };

  const removeTheProduct = (value_id) => {
    remove(value_id);
  };
  return (
    <React.Fragment>
      <div className="cart_sidebar">
        <Modal
          show={cartModal}
          onHide={() => {
            setcartModal(false);
          }}
          className="cart_modal"
        >
          <div
            className="close-icon"
            onClick={() => {
              setcartModal(false);
            }}
          >
            <MdOutlineClose className="theme_icon_color" />
          </div>

          <Modal.Body>
            <div>
              <h4>Shopping Cart</h4>
              <hr />

              {cart != "" && cart?.cart_items != "" && cart?.cart_items ? (
                <div className={blurClass === true ? "blur_items" : ""}>
                  {cart.cart_items
                    .sort((a, b) =>
                      a.product_name.localeCompare(b.product_name)
                    )
                    .map((val) => (
                      <React.Fragment key={val.id}>
                        <div className="mt-5">
                          <div className="d-flex">
                            <div
                              className="pe-auto"
                              onClick={() =>
                                getProductDetails(
                                  val.product_id,
                                  val.product_name
                                )
                              }
                            >
                              <img
                                src={`${
                                  val?.product_image?.thumbnail
                                    ? val?.product_image?.thumbnail
                                    : "/images/image-not-found.jpg"
                                }`}
                                alt={val.product_name}
                                className="cart_popup_image"
                              />
                            </div>
                            <div className="cart_popup_description">
                              <div className="d-flex justify-content-between">
                                <div className="cart_desc">
                                  <p
                                    className="mb-3 cart_popup_p cart_product_name"
                                    onClick={() =>
                                      getProductDetails(
                                        val.product_id,
                                        val.product_name
                                      )
                                    }
                                  >
                                    {val.product_name}
                                  </p>
                                  <p>
                                    Unit Price : {storeSettings.currency_code}{" "}
                                    {val.unit_price}
                                  </p>
                                  {val?.variant && (
                                    <div className="variant_display">
                                      {val.variant?.attributes.map((attr) => (
                                        <small>
                                          {attr.option_type} :{" "}
                                          {attr.option_value}
                                        </small>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="cart_desc">
                                  <p
                                    className="fw-bold"
                                    onClick={() => removeTheProduct(val.id)}
                                  >
                                    REMOVE
                                  </p>
                                </div>
                              </div>
                              {val?.stock_qty > 0 ? (
                                <div className="update_div">
                                  <div className="cart_count">
                                    <div
                                      className={`cursor_class`}
                                      onClick={() =>
                                        Decrease(
                                          val.id,
                                          val.quantity,
                                          setblurClass
                                        )
                                      }
                                    >
                                      <span style={{ fontSize: "30px" }}>
                                        -
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {val.quantity}
                                    </div>
                                    <div
                                      className={`cursor_class ${
                                        val.quantity === val.stock_qty
                                          ? "disable_qty"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        val.quantity !== val.stock_qty &&
                                        Increase(
                                          val.id,
                                          val.quantity,
                                          setblurClass
                                        )
                                      }
                                    >
                                      <span style={{ fontSize: "22px" }}>
                                        +
                                      </span>
                                    </div>
                                  </div>
                                  <div className="total_price">
                                    <p className="fw-bold">
                                      {storeSettings.currency_code}{" "}
                                      {val.total_price}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="outstock">
                                  <ImCross color="red" />{" "}
                                  <span>Out of stock</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  <div className="flex justify-content-center">
                    {cart.cart_items.find((item) => item.stock_qty === 0) ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip">
                            One or more products are out of stock!!
                          </Tooltip>
                        }
                      >
                        <button
                          disabled={true}
                          className="theme_button cart_button mt-5"
                          style={{ cursor: "not-allowed", opacity: "0.4" }}
                        >
                          <span>Proceed to checkout</span>
                          <span>
                            | {storeSettings.currency_code} {cart.total}
                          </span>
                        </button>
                      </OverlayTrigger>
                    ) : (
                      <button
                        className="theme_button cart_button mt-5"
                        onClick={Checkout}
                      >
                        <span>Proceed to checkout</span>
                        <span>
                          | {storeSettings.currency_code} {cart.total}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="mt-5 text-center">
                    <img src="/images/not-found-alt.svg" alt="notfound" />
                    <h6 className="mt-4 mb-4">Your Cart is empty</h6>
                  </div>
                </React.Fragment>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/* signin modal */}
      <Login
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        registerToggle={registerToggle}
      />

      {/*  register modal start*/}
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
        signInToggle={signInToggle}
      />
    </React.Fragment>
  );
};

export default CartPopup;
