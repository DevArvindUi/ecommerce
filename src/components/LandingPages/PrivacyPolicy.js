import React from "react";
import { useParams } from "react-router-dom";

const PrivacyPolicy = () => {
  const { slug } = useParams();

  return (
    <div className="static_pages_div my-5">
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      <p>{slug}</p>
    </div>
  );
};

export default PrivacyPolicy;
