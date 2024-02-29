import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "../../context/CartContext";
import { StoreContext } from "../../context/store-settings-context";

const Checkoutorder = ({ shippingCharge }) => {
  const [spinner, setspinner] = useState(false);
  const { cart, applyCouponCode, removeCouponCode, Increase, Decrease } =
    useGlobalContext();
  const [coupon_code, setcoupon_code] = useState("");
  const [blurClass, setblurClass] = useState(false);
  const [error, seterror] = useState(true);
  const { storeSettings } = useContext(StoreContext);
  const navigate = useNavigate();

  //get product details on clickign product in order summary
  const getProductDetails = async (id, name) => {
    await navigate(`/product/${name}/${id}`, {
      state: { selectedProd: { id } },
    });
  };

  const handlecoupon = (e) => {
    const { name, value } = e.target;
    setcoupon_code(value);
    if (value.length > 0) {
      seterror(false);
    } else {
      seterror(true);
    }
  };

  return (
    <div className="checkout_summary">
      <h4 className="mt-5 mb-3">Your order</h4>
      {!spinner ? (
        <>
          <div className="background_lightGrey d-flex justify-content-between summary_head">
            <div style={{ width: "45%" }}>Product</div>
            <div>QTY</div>
            <div>Total</div>
          </div>
          {cart?.cart_items && (
            <div
              className={`summary_body ${
                blurClass === true ? "blur_items" : ""
              }`}
            >
              {cart.cart_items.map((value) => (
                <div
                  className="d-flex justify-content-between divfirst"
                  key={value.id}
                >
                  <div className="product d-flex">
                    <div>
                      <img
                        src={`${
                          value?.product_image?.thumbnail
                            ? value?.product_image?.thumbnail
                            : "/images/image-not-found.jpg"
                        }`}
                        alt="prod_image"
                        onClick={() =>
                          getProductDetails(
                            value.product_id,
                            value.product_name
                          )
                        }
                        className="cursor_class"
                      />
                    </div>
                    <div className="checkout-div">
                      <p
                        onClick={() =>
                          getProductDetails(
                            value.product_id,
                            value.product_name
                          )
                        }
                        className="cursor_class"
                        style={{ lineHeight: "normal" }}
                      >
                        {value.product_name}
                      </p>
                      <p className="unit-price-checkout mb-4">
                        Unit Price : <span>{storeSettings.currency_code} {""}
                        {value.unit_price}</span>
                      </p>

                      {value?.variant && (
                        <div className="variant_display mt-4">
                          {value.variant?.attributes.map((attr) => (
                            <p>
                              {attr.option_type} : {attr.option_value}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {value.stock_qty > 0 ? (
                    <div className="checkout_count_buttons">
                      <button>
                        <GrSubtract
                          size={10}
                          onClick={() =>
                            Decrease(value.id, value.quantity, setblurClass)
                          }
                        />
                      </button>
                      <div>{value.quantity}</div>
                      <button>
                        <GrAdd
                          size={10}
                          onClick={() =>
                            value.quantity !== value.stock_qty &&
                            Increase(value.id, value.quantity, setblurClass)
                          }
                          className={
                            value.quantity === value.stock_qty
                              ? "disable_qty"
                              : ""
                          }
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="outstock">
                      <ImCross color="red" /> <span>Out of stock</span>
                    </div>
                  )}

                  <div className="subtotal">
                    <p>
                      {storeSettings.currency_code} {""}
                      {value.total_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="summary_last mt-4">
            {!cart?.coupon_code ? (
              <>
                <div className="coupon_div mt-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    onChange={(e) => handlecoupon(e)}
                    value={coupon_code}
                    name="coupon_code"
                  />
                  {!error ? (
                    <button
                      className="theme_button"
                      type="submit"
                      onClick={() =>
                        applyCouponCode(coupon_code, setcoupon_code, seterror)
                      }
                    >
                      Apply Coupon
                    </button>
                  ) : (
                    <button className="not-allowed-cursor opacity-50 theme_button">
                      Apply Coupon
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="product">
                <div>
                  <p style={{ color: "gray" }}>
                    Discount (Coupon Code: {cart?.coupon_code}) :
                    <span className="text-success">
                      {""} {storeSettings.currency_code}{" "}
                      {cart?.applied_discount}
                    </span>
                  </p>
                </div>
                <div>
                  <p
                    className="mb-3 cursor_class text-danger"
                    onClick={() => removeCouponCode(coupon_code)}
                  >
                    Remove
                  </p>
                </div>
              </div>
            )}
            <div className="mb-4">
              <div className="product">
                <p className="mb-3">
                  <HiOutlineCurrencyRupee
                    size={20}
                    className="theme_icon_color"
                    style={{ marginRight: "6px" }}
                  />
                  Subtotal
                </p>
                <p className="mb-3">
                  {storeSettings.currency_code} {cart?.sub_total}
                </p>
              </div>
              <div className="product">
                <p className="mb-3">
                  <MdOutlineLocalShipping
                    size={20}
                    className="theme_icon_color"
                    style={{ marginRight: "6px" }}
                  />
                  Shipping
                </p>
                <p className="mb-3">
                  {storeSettings.currency_code} {cart?.shipping_charge}
                </p>
              </div>

              <div className="product">
                <p className="mb-3">
                  <HiOutlineCurrencyRupee
                    size={20}
                    className="theme_icon_color"
                    style={{ marginRight: "6px" }}
                  />
                  Total
                </p>
                <p className="mb-3">
                  {storeSettings.currency_code} {cart?.total}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 mb-5">
          <TailSpin
            color="#000000"
            height={40}
            width={40}
            className="theme_icon_color"
          />
        </div>
      )}
    </div>
  );
};
export default Checkoutorder;
