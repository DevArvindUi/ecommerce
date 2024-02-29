import React from "react";

const Feature = () => {
  const data = [
    {
      id: 1,
      image: "/images/feature/delivery.png",
      title: "Fast Delivery",
      description:
        "Super Fast Delivery",
    },
    {
      id: 2,
      image: "/images/feature/secure_payment.png",
      title: "Secure Payment",
      description:
        "We Value Your Security",
    },
    {
      id: 3,
      image: "/images/feature/support.png",
      title: "Online Support",
      description:
        "We Have Support 24/7",
    }
  ];
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row feature_row">
          {data.map((value) => (
            <div
              key={value.id}
              className="col-lg-4 col-md-4 col-sm-10 text-center feature_div"
            >
              <img src={value.image} alt={value.title} width='80' />
              <h4 className="mt-2">{value.title}</h4>
              <p className="mt-2">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Feature;
