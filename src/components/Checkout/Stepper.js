import React, { useState, useEffect, useContext } from "react";
import Stepper from "react-stepper-horizontal";
import ShippingAdd from "./ShippingAdd";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import Payment from "./Payment";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useGlobalContext } from "../../context/CartContext";
import { StoreContext } from "../../context/store-settings-context";
import GuestLogin from "./GuestLogin";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const StepperComp = ({ guestLogin, setGuestLogin, setShippingCharge }) => {
  const token = localStorage.getItem("auth_token");
  const cartToken = localStorage.getItem("cart_token");
  const { fetchAuthCart, cart } = useGlobalContext();
  const { storeSettings } = useContext(StoreContext);
  const [activeStep, setactiveStep] = useState(0);
  const [address_id, setaddress_id] = useState("");
  const [payment_method, setpayment_method] = useState("");
  const [isaddEmpty, setisaddEmpty] = useState(true);
  const [ispaymentEmpty, setispaymentEmpty] = useState(true);
  const navigate = useNavigate();
  const [screen, setscreen] = useState("login");

  const Usersections = [
    { title: "Login" },
    { title: "Delivery Address", onClick: () => setactiveStep(1) },
    { title: "Payment", onClick: () => setactiveStep(2) },
  ];

  const GuestSections = [
    { title: "Delivery Address" },
    { title: "Payment", onClick: () => setactiveStep(1) },
  ];

  const verifyStock = (proceedFunction, paymentType) => {
    const headers = cartToken!=null ? { CartAuthorization: `${cartToken}` } : { Authorization: `${token}` };
    axios
      .get(`${BASE_URL}/carts/verify_stock`, { headers })
      .then((res) => {
        if (res?.data?.data) {
          if(paymentType === "razorpay"){
            document.body.style.opacity = "0.2";
          }
          proceedFunction();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.meta.message);
        setactiveStep(2);
      });
  };
  

  const handleOnClickNext = () => {
    if (!guestLogin || localStorage.getItem("isGuest") === "false") {
      if (activeStep == 1) {
        sendAddress();
      }

      if (activeStep == 2 && payment_method == "cod") {
        verifyStock(confirmCodOrder, "cod");
      }

      if (
        activeStep == 2 &&
        (payment_method == "razorpay" || payment_method == "stripe")
      ) {
        verifyStock(placeRazorPayOrder,"razorpay");
        // document.body.style.opacity = "0.2";
      }

      if (activeStep == 2 && payment_method == "phonepe") {
        initiatePhonePay();
        // document.body.style.opacity = "0.2";
      }
    } else {
      getSelectedAddress();
      if (activeStep === 1 && payment_method == "cod") {
        verifyStock(confirmCodOrder, "cod");
      }
      if (
        activeStep == 1 &&
        (payment_method == "razorpay" || payment_method == "stripe")
      ) {
        verifyStock(placeRazorPayOrder, "razorpay");
        // document.body.style.opacity = "0.2";
      }

      if (activeStep == 1 && payment_method == "phonepay") {
        initiatePhonePay();
      }
    }

    let nextStep = activeStep + 1;
    setactiveStep(nextStep);
  };

  const LoginScreen = () => {
    setscreen("login");
  };

  const SignupScreen = () => {
    setscreen("signup");
  };
  const handleOnClickBack = () => {
    let prevStep = activeStep - 1;
    setactiveStep(prevStep);
  };

  const getSelectedAddress = async () => {
    try {
      const headers = { Authorization: `${token}` };
      const response = await axios.get(`${BASE_URL}/addresses`, {
        headers,
      });
      const data = response.data.data;

      if (data[0]?.id) {
        let address_id = data[0].id;

        try {
          const res = await axios.post(
            `${BASE_URL}/carts/add_address`,
            { address_id },
            {
              headers,
            }
          );
          fetchAuthCart(token);
        } catch (error) {
          if (error?.response?.data?.meta?.message === "Token expired.") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("isGuest");
            navigate("/", { replace: true });
            window.location.reload(false);
          }
        }
      }
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const sendAddress = () => {
    const headers = { Authorization: `${token}` };
    axios
      .post(`${BASE_URL}/carts/add_address`, { address_id }, { headers })
      .then((res) => {
        setShippingCharge(res.data.data.shipping_charge);
        fetchAuthCart(token);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.meta?.message);
        setactiveStep(1);
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };

  const confirmCodOrder = () => {
    confirmAlert({
      message: "Are you sure you want to place your order?",
      buttons: [
        {
          label: "Yes",
          className: "theme_button",
          onClick: () => placeCodOrder(),
        },
        {
          label: "No",
          className: "theme_button",
          onClick: () =>
            localStorage.getItem("isGuest") === "false"
              ? setactiveStep(2)
              : setactiveStep(1),
        },
      ],
    });
  };
  const placeCodOrder = async () => {
    const headers = { Authorization: `${token}` };
    try {
      const res = await axios.post(
        `${BASE_URL}/orders`,
        { payment_method },
        { headers }
      );
      const invoice_number = res.data.data.invoice_number;
      const orderid = res.data.data.id;
      fetchAuthCart(token);
      navigate("/order-success", {
        state: { orderId: { invoice_number, orderid } },
      });
      localStorage.setItem("isGuest", "false");
    } catch (error) {
      toast.error(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const placeRazorPayOrder = async () => {
    const headers = { Authorization: `${token}` };
    const result = await axios.post(
      `${BASE_URL}/payments`,
      { payment_method },
      {
        headers,
      }
    );
    const p_data = result.data.data;

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    const { total, transaction_id } = p_data;

    var options = {
      key: storeSettings.payment_method.apiKey, // Enter the Key ID generated from the Dashboard
      amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: document.title,
      description: "Test Transaction",
      order_id: transaction_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const headers = {
          "content-type": "application/json",
          Authorization: `${token}`,
        };

        const data = {
          payment_id: response.razorpay_payment_id,
          transaction_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };

        const result_v = await axios.post(
          `${BASE_URL}/payments/verify_payment`,
          data,
          { headers }
        );
        const invoice_number = result_v.data.data.invoice_number;
        const orderid = result_v.data.data.id;
        fetchAuthCart(token);
        navigate("/order-success", {
          state: { orderId: { invoice_number, orderid } },
        });
        localStorage.setItem("isGuest", "false");
      },
      prefill: {
        name: "ABC",
        email: "abc@test.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000000",
      },
      modal: {
        ondismiss: () =>
          localStorage.getItem("isGuest") === "false"
            ? setactiveStep(2)
            : setactiveStep(1),
        // ondismiss: () => setactiveStep(2),
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    document.body.style.opacity = "1";
  };

  const initiatePhonePay = async () => {
    const baseURL = window.location.origin;
    const headers = { Authorization: `${token}` };
    const redirect_url = `${baseURL}/order-status`;

    const formData = new FormData();
    formData.append("redirect_url", redirect_url);

    try {
      const res = await axios.post(
        `${BASE_URL}/payments/initiate_phonepe_payment`,
        formData,
        { headers }
      );

      if (res.data.data.url) {
        window.location.replace(res.data.data.url);
      }
    } catch (error) {
      toast.error(error?.response?.data?.meta?.message);
    }
  };

  useEffect(() => {
    if (token != null) {
      setactiveStep(1);
    }
    if (address_id !== "") {
      setisaddEmpty(false);
      setactiveStep(1);
    }
  }, [address_id]);

  useEffect(() => {
    if (payment_method !== "") {
      setispaymentEmpty(false);
    }
  }, [payment_method]);

  return (
    <>
      <div className="stepper_component">
        <div className="stepper_main mt-4 ">
          <Stepper
            steps={
              !guestLogin || localStorage.getItem("isGuest") === "false"
                ? Usersections
                : GuestSections
            }
            activeStep={activeStep}
            activeColor="black"
            defaultBarColor="#e8e8e8"
            completeColor="green"
            completeTitleColor="green"
            completeBarColor="green"
            size={30}
            circleFontSize={14}
            titleFontSize={15}
            circleTop={20}
            barStyle="dashed"
          />
        </div>
        {/* {((token != null && !guestLogin) || (token ==null && !guestLogin)) ? ( */}
        {!guestLogin || localStorage.getItem("isGuest") === "false" ? (
          <div className="below_stepper">
            {activeStep === 0 && (
              <React.Fragment>
                {screen === "login" && (
                  <LoginForm
                    SignupScreen={SignupScreen}
                    setactiveStep={setactiveStep}
                    setGuestLogin={setGuestLogin}
                  />
                )}
                {screen === "signup" && (
                  <SignupForm
                    LoginScreen={LoginScreen}
                    setactiveStep={setactiveStep}
                  />
                )}
              </React.Fragment>
            )}

            {activeStep === 1 && (
              <React.Fragment>
                <ShippingAdd
                  setaddress_id={setaddress_id}
                  address_id={address_id}
                />
                <div className="d-flex justify-content-end">
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
                        className="theme_button next_button mb-4"
                        style={{ cursor: "not-allowed", opacity: "0.4" }}
                      >
                        Proceed <RiArrowRightLine />
                      </button>
                    </OverlayTrigger>
                  ) : (
                    <button
                      onClick={handleOnClickNext}
                      className="theme_button next_button mb-4"
                      disabled={isaddEmpty}
                      style={
                        isaddEmpty
                          ? { cursor: "not-allowed", opacity: "0.4" }
                          : {}
                      }
                    >
                      Proceed <RiArrowRightLine />
                    </button>
                  )}
                </div>
              </React.Fragment>
            )}

            {activeStep === 2 && (
              <React.Fragment>
                <Payment
                  setpayment_method={setpayment_method}
                  payment_method={payment_method}
                />
                <div className="d-flex justify-content-between">
                  <button
                    className="theme_button back_button mb-4"
                    onClick={handleOnClickBack}
                  >
                    <RiArrowLeftLine /> Back
                  </button>
                  <button
                    onClick={handleOnClickNext}
                    className="theme_button next_button mb-4"
                    disabled={ispaymentEmpty}
                    style={
                      ispaymentEmpty
                        ? { cursor: "not-allowed", opacity: "0.4" }
                        : {}
                    }
                  >
                    Place Order <RiArrowRightLine />
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        ) : (
          <div className="below_stepper">
            {activeStep === 0 && (
              <GuestLogin
                setactiveStep={setactiveStep}
                setGuestLogin={setGuestLogin}
                setscreen={setscreen}
                sendAddress={sendAddress}
                address_id={address_id}
                setaddress_id={setaddress_id}
              />
            )}

            {activeStep === 1 && (
              <React.Fragment>
                <Payment
                  setpayment_method={setpayment_method}
                  payment_method={payment_method}
                />
                <div className="d-flex justify-content-end">
                  <button
                    onClick={handleOnClickNext}
                    className="theme_button next_button mb-4"
                    disabled={ispaymentEmpty}
                    style={
                      ispaymentEmpty
                        ? { cursor: "not-allowed", opacity: "0.4" }
                        : {}
                    }
                  >
                    Place Order <RiArrowRightLine />
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StepperComp;
