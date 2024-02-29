import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId } = state;
  const { invoice_number, orderid } = orderId;

  useEffect(() => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 5000);
  }, []);

  const shopping = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      {!loader ? (
        <div className="order_success_div">
          <div className="text-center mt-5">
            <h4 className="mt-5 mb-4">Thankyou! Your order has been placed</h4>
            <h6 style={{ color: "dimgray" }} className="mb-4">
              Order ID : {invoice_number}
            </h6>
            <BsFillCheckCircleFill size={50} style={{ color: "green" }} />
            <p className="mt-4">
              You will shortly receive an order confirmation email with details
              of your order
            </p>
            <div>
              <button
                className="theme_button mt-5 order_success_btn"
                onClick={shopping}
              >
                Continue Shopping
              </button>
              <Link to={`/my-account/orders/${orderid}`}>
                <button className="theme_button mt-5 order_success_btn">
                  View My Order
                </button>
              </Link>
            </div>
          </div>
        </div>
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
                Please wait...your order is getting placed
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderSuccess;
