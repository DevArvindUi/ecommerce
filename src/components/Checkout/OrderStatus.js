import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import {AiFillCloseCircle} from "react-icons/ai"

const OrderStatus = () => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    getPhonepePaymentStatus();
  }, []);

  const getPhonepePaymentStatus = async () => {
    if (!token) {
      // Handle token not being available
      return;
    }

    const headers = { Authorization: token };

    try {
      const phonepeResponse = await axios.post(
        `${BASE_URL}/payments/phonepe_payment_status`,
        null, // Passing null as the second parameter for POST request
        { headers }
      );

      const orderData = phonepeResponse.data.data;
      const invoice_number = phonepeResponse.data.data.invoice_number;
      const orderid = phonepeResponse.data.data.order_id;

      if (orderData?.code === "PAYMENT_SUCCESS") {
        setLoading(false);
        navigate("/order-success", {
          state: { orderId: { invoice_number, orderid } },
        });
      }
    } catch (error) {
      setHasError(true);
      setResponseMessage(error?.response?.data?.meta?.message);
      setTimeout(()=>{
        setLoading(false);
      },2000);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  return (
    <>
      {!loading ? (
        hasError && (
          <div className="order_success_div">
            <div className="text-center mt-5">
            <AiFillCloseCircle size={50} style={{ color: "red" }} />
              <h4 className="mt-5 mb-4">
                {responseMessage}
              </h4>
              <div>
                <button
                  className="theme_button mt-5 order_success_btn"
                >
                  Continue Shopping
                </button>
                <Link to={`/checkout`}>
                  <button className="theme_button mt-5 order_success_btn">
                   Complete your order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="" style={{ minHeight: "400px" }}>
          <div>
            <div
              style={{
                display: "block",
                margin: "auto",
                width: "min-content",
                marginTop: "10%",
              }}
            >
              <TailSpin color="#000000" height={100} width={100} />
            </div>
            <div className="mt-5">
              <p className="text-center">
                Do not press back, we are fetching your payment status
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderStatus;
