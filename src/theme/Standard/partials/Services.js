import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdSupportAgent, MdOutlineSafetyCheck } from "react-icons/md";

const serviceImages = [
  {
    img: <FaTruckFast size={50} color="grey"/>,
    name: "Fast Delivery",
    description: "Super Fast Delivery",
  },
  {
    img: <MdSupportAgent size={50} color="orange"/>,
    name: "Online Support",
    description:
      "Estimations help your team become more accurate and efficient.",
  },
  {
    img: <RiSecurePaymentLine size={50} color="green"/>,
    name: "Secure Payment",
    description:
      "Order user stories, issues, and bugs in your product backlog ",
  },
  {
    img: <MdOutlineSafetyCheck size={50} color="blue" />,
    name: "100% Safe",
    description: "Every team has a unique process for shipping software. ",
  },
];

const Services = () => {
  return (
    <div className="container section-gap">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center fw-bold fs-2 lh-base mb-5">
            We' Commited to <br /> Provide Quality Services
          </h2>
        </div>
      </div>
      <div className="row">
      {serviceImages.map((service, index) => (
          <div className="text-center col-lg-3 col-md-3 col-sm-12" key={index}>
            {service.img}
            <h5 className="lh-base mt-3">{service.name}</h5>
            <p className="text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
