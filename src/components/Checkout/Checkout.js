import React, { useState } from "react";
import Checkoutorder from "./Checkoutorder";
import StepperComp from "./Stepper";
import { useGlobalContext } from "../../context/CartContext";

const Checkout = ({ guestLogin, setGuestLogin }) => {
   const { cart } = useGlobalContext();
   const [shippingCharge, setShippingCharge] = useState(cart?.shipping_charge);
   //dd
   return (
      <div style={{ minHeight: "500px" }}>
         <div className="row mt-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
               <StepperComp guestLogin={guestLogin} setGuestLogin={setGuestLogin} setShippingCharge={setShippingCharge} />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-lg-5 col-xl-5">
               <Checkoutorder shippingCharge={shippingCharge} />
            </div>
         </div>
      </div>
   );
};
export default Checkout;
