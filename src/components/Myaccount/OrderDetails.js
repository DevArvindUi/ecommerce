import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stepper from "react-stepper-horizontal";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { BsBagCheck } from "react-icons/bs";
import { TiLocationOutline } from "react-icons/ti";
import { Table } from "react-bootstrap";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SweetAlert from "react-bootstrap-sweetalert";
import { StoreContext } from "../../context/store-settings-context";

const OrderDetails = () => {
  let { id } = useParams();
  const token = localStorage.getItem("auth_token");
  const [orderData, setorderData] = useState({});
  const [orderAdd, setorderAdd] = useState({});
  const [orderitems, setorderitems] = useState([]);
  const [loader, setloader] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [alertTitle, setalertTitle] = useState("");
  const [alertType, setalertType] = useState("");
  const [successactiveStep, setsuccessactiveStep] = useState(0);
  const [cancelactiveStep, setcancelactiveStep] = useState(0);
  const { storeSettings } = useContext(StoreContext);
  const navigate = useNavigate();

  const successOrdertrack = [
    {
      title: `Placed 
      ${orderData.created_at}`,
    },
    {
      title: `Confirmed 
    ${orderData.confirmed_at}`,
    },
    {
      title: `Shipped 
    ${orderData.shipped_at}`,
    },
    {
      title: `Out For Delivery 
    ${orderData.out_for_delivery_at}`,
    },
    {
      title: `Delivered 
    ${orderData.delivered_at}`,
    },
  ];

  const cancelOrderTrack = [
    {
      title: `Placed 
    ${orderData.created_at}`,
    },
    {
      title: `Cancelled 
    ${orderData.cancelled_at}`,
    },
  ];

  useEffect(() => {
    getSelectedOrder();
  }, []);

  const getSelectedOrder = async () => {
    setloader(true);
    try{
      const headers = { Authorization: `${token}` };
      const order_res = await axios.get(`${BASE_URL}/orders/${id}`, { headers });
      const order_data = order_res.data.data;
      setorderData(order_data);
      setorderAdd(order_data.order_address);
      setorderitems(order_data.order_items);
      setloader(false);
  
      if (order_data.status === "Confirmed") setsuccessactiveStep(1);
      if (order_data.status === "Shipped") setsuccessactiveStep(2);
      if (order_data.status === "Out For Delivery") setsuccessactiveStep(3);
      if (order_data.status === "Delivered") setsuccessactiveStep(4);
      if (order_data.status === "Cancelled") setcancelactiveStep(1);
    }
    catch(error){
      setloader(false);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
    
  };

  // ###### move to product details page #######
  const getProductDetails = (id, name) => {
    navigate(`/product/${name}/${id}`, {
      state: { selectedProd: { id } },
    });
  };

  //####### confirm cancel #############
  const confirmsubmit = () => {
    confirmAlert({
      message: "Are you sure you want to Cancel the Order?",
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelOrder(),
          className: "theme_button",
        },
        {
          label: "No",
          onClick: () => {},
          className: "theme_button",
        },
      ],
    });
  };

  // ######## Cancel Order ###############
  const cancelOrder = () => {
    const headers = { Authorization: `${token}` };
    axios
      .put(`${BASE_URL}/orders/${id}`, { id }, { headers })
      .then((res) => {
        setalertTitle("Order has been cancelled!!");
        setalertType("success");
        setCancel(true);
        getSelectedOrder();
      })
      .catch((error) => {
        setalertTitle(error.response.data.meta.message);
        setalertType("danger");
        setCancel(true);
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };

  //rate product
  const rateProduct = async (product_id, order_item_id) => {
    try{
      const res = await axios.get(`${BASE_URL}/products/${product_id}`);
      const data = res.data.data;
      const name = data?.name;
      const price_with_tax = data?.price_with_tax;
      const image = data?.gallery[0]?.medium;
      const average_rating = data?.average_rating;
      const compare_price = data?.compare_price;
      const orderDetailFlag = true;
      navigate(`/rate-product/${product_id}`, {
        state: {
          selectedProdRate: {
            product_id,
            name,
            price_with_tax,
            image,
            average_rating,
            compare_price,
            orderDetailFlag,
            order_item_id,
          },
        },
      });
    }
    catch(error){
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
    
  };
  return (
    <React.Fragment>
      {cancel && (
        <div className="sweet_alert">
          {alertType === "success" ? (
            <SweetAlert
              success
              title={alertTitle}
              onConfirm={() => {
                setCancel(false);
              }}
            />
          ) : (
            <SweetAlert
              danger
              title={alertTitle}
              onConfirm={() => {
                setCancel(false);
              }}
            />
          )}
        </div>
      )}

      <div className="order_details_main mb-5 container">
        {!loader ? (
          <React.Fragment>
            <div className="order_block row">
              <div className="col-lg-6 col-sm-10 d-flex mt-3">
                <div>
                  <BsBagCheck size={30} className="theme_icon_color" />
                </div>
                <div className="order_info">
                  <h6 className="mb-4">
                    Order Number : {orderData.invoice_number}
                  </h6>
                  <p>Order date: {orderData.created_at} </p>
                  <p>Status: {orderData.status}</p>
                  <p>Payment Mode: {orderData.payment_mode}</p>
                </div>
              </div>
              <div className="delivery_add col-lg-6 col-sm-10 d-flex mt-3">
                <div>
                  <TiLocationOutline size={30} className="theme_icon_color" />
                </div>

                <div className="shipping_info">
                  <h6 className="mb-4">Shipping Address</h6>
                  <p>Name: {orderAdd?.full_name}</p>
                  <p>Phone: {orderAdd?.mobile_number}</p>
                  <p style={{ lineHeight: "20px" }}>
                    Address: {orderAdd?.address_line_1} {orderAdd?.address_line_2}
                    ,{orderAdd?.city}, {orderAdd?.state}, {orderAdd?.country},{" "}
                    {orderAdd?.pincode}
                  </p>
                  {orderAdd?.landmark ? (
                    <p>Landmark: {orderAdd?.landmark}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="order_block row">
              <div className="step_comp">
                {orderData.status === "Cancelled" && (
                  <Stepper
                    steps={cancelOrderTrack}
                    activeStep={cancelactiveStep}
                    activeColor="red"
                    completeColor="red"
                    completeTitleColor="red"
                    completeBarColor="red"
                    activeTitleColor="red"
                    size={28}
                    circleFontSize={12}
                    titleFontSize={15}
                    circleTop={20}
                    barStyle="dashed"
                  />
                )}
                {(orderData.status === "Placed" ||
                  orderData.status === "Confirmed" ||
                  orderData.status === "Shipped" ||
                  orderData.status === "Out For Delivery" ||
                  orderData.status === "Delivered") && (
                  <Stepper
                    steps={successOrdertrack}
                    activeStep={successactiveStep}
                    activeColor="green"
                    defaultBarColor="#e8e8e8"
                    completeColor="green"
                    completeTitleColor="green"
                    completeBarColor="green"
                    activeTitleColor="green"
                    size={28}
                    circleFontSize={12}
                    titleFontSize={15}
                    circleTop={20}
                    barStyle="dashed"
                  />
                )}
              </div>
            </div>
            <div className="order_block row">
              <div className="d-flex align-items-center">
                <div>
                  <BiMessageSquareDetail
                    size={30}
                    className="theme_icon_color"
                  />
                </div>
                <div className="order_det">
                  <h6>Order details</h6>
                </div>
              </div>
              <div className="mt-3" style={{ fontSize: "14px" }}>
                <div className="order_table_mobile">
                  {orderitems.map((item) => (
                    <React.Fragment key={item.id}>
                      <div className="d-flex">
                        <img
                          src={`${
                            item?.product_image?.thumbnail
                              ? item?.product_image?.thumbnail
                              : "/images/image-not-found.jpg"
                          }`}
                          alt={item?.product_name}
                          style={{
                            height: "70px",
                            borderRadius: "10px",
                            width: "70px",
                          }}
                        />
                        <div className="order_details_prod">
                          <span
                            className="cursor_class"
                            onClick={() =>
                              getProductDetails(
                                item.product_id,
                                item.product_name
                              )
                            }
                          >
                            {item.product_name}
                          </span>
                          <div className="my-2">
                            <span>
                              Unit Price: {storeSettings.currency_code}{" "}
                              {item.unit_price} x {item.quantity}
                            </span>
                            <br />
                            <span>
                              Total Price: {storeSettings.currency_code}{" "}
                              {item.total_price}
                            </span>
                          </div>

                          <p
                            className="cursor_class"
                            onClick={() =>
                              rateProduct(item.product_id, item.id)
                            }
                          >
                            Rate Product
                          </p>
                          {item?.variant && (
                            <div className="variant_display">
                              {item.variant?.attributes.map((attr) => (
                                <small>
                                  {attr.option_type} : {attr.option_value}
                                </small>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
                <Table
                  className="order_table"
                  style={{ borderCollapse: "inherit" }}
                >
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Product detail</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderitems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex ">
                            <img
                              src={`${
                                item?.product_image?.thumbnail
                                  ? item?.product_image?.thumbnail
                                  : "/images/image-not-found.jpg"
                              }`}
                              alt={item.product_name}
                              style={{
                                height: "70px",
                                borderRadius: "10px",
                                width: "70px",
                              }}
                            />
                            <div className="order_details_prod">
                              <span
                                className="cursor_class"
                                onClick={() =>
                                  getProductDetails(
                                    item.product_id,
                                    item.product_name
                                  )
                                }
                              >
                                {item.product_name}
                              </span>
                              <p
                                className="cursor_class mb-1"
                                onClick={() =>
                                  rateProduct(item.product_id, item.id)
                                }
                              >
                                Rate Product
                              </p>
                              {item?.variant && (
                                <div className="variant_display text-dark">
                                  {item.variant?.attributes.map((attr) => (
                                    <small>
                                      {attr.option_type} : {attr.option_value}
                                    </small>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          {storeSettings.currency_code} {item.unit_price}
                        </td>
                        <td>x {item.quantity}</td>
                        <td>
                          {storeSettings.currency_code} {item.total_price}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td>
                        {orderData.status !== "Out For Delivery" &&
                        orderData.status !== "Shipped" &&
                        orderData.status !== "Returned" &&
                        orderData.status !== "Refunded" &&
                        orderData.can_cancel ? (
                          <button
                            className="theme_button"
                            style={{ borderRadius: "8px", padding: "8px 10px" }}
                            onClick={confirmsubmit}
                          >
                            Cancel Order
                          </button>
                        ) : null}
                      </td>
                      <td></td>
                      <td>
                        <div
                          style={{ lineHeight: "40px", fontWeight: "bolder" }}
                        >
                          <div>Subtotal</div>
                          <div>Shipping</div>
                          <div>Total</div>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{ lineHeight: "40px", fontWeight: "bolder" }}
                        >
                          <div>
                            {storeSettings.currency_code} {""}
                            {orderData.sub_total}
                          </div>
                          <div>
                            {storeSettings.currency_code} {""}
                            {orderData.shipping_charge}
                          </div>
                          <div>
                            {storeSettings.currency_code} {""}
                            {orderData.total}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div
            style={{
              display: "block",
              margin: "auto",
              width: "min-content",
              marginTop: "10%",
            }}
          >
            <TailSpin color="#000000" height={80} width={80} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default OrderDetails;
