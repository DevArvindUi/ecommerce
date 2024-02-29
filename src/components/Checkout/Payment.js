import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import { BsCashCoin } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Payment = ({ setpayment_method, payment_method }) => {
  const token = localStorage.getItem("auth_token");
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [currentRadioPay, setCurrentRadioPay] = useState(payment_method);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPaymentMethod();
  }, []);

  //render payment options
  const getPaymentMethod = async () => {
    try {
      setLoader(true);
      const headers = { Authorization: `${token}` };
      const payment_res = await axios.get(`${BASE_URL}/store_settings/payment_options`, { headers });
      const payment_data = payment_res.data.data;
      setPaymentMethod(payment_data);
      setLoader(false);
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
      setLoader(false);
    }
  };
  
  //radio button change event
  const handlepayradioChange = (target) => {
    setCurrentRadioPay(target.value);
    setpayment_method(target.value);
  };

  const handleDivClick = (valueId) => {
    let target = {value: valueId}
    handlepayradioChange(target);
  };

  return (
    <>
      {!loader ? (
        <>
          {" "}
          <h6>Select a payment method</h6>
          <div className="form-check" style={{ paddingLeft: "0px" }}>
            {paymentMethod.map((pay, index) => (
              <div key={index} className="radio_payment" onClick={() => handleDivClick(pay.value)}>
                <div className="d-flex justify-content-between">
                  <div className="address_details">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id={index}
                      value={pay.value}
                      checked={currentRadioPay == pay.value}
                      onChange={(e) => handlepayradioChange(e.target)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      <div>
                        <p>{pay.name}</p>
                      </div>
                    </label>
                  </div>
                  <div>
                    {pay.value == "cod" && <BsCashCoin size={25} className="theme_icon_color"/>}
                    {(pay.value == "razorpay" || pay.value == "stripe" || pay.value == "phonepe") && <MdPayment size={25} className="theme_icon_color" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}
    </>
  );
};

export default Payment;
