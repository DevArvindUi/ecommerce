import React from "react";
import { BiSad } from "react-icons/bi";
import { RiNumber4 } from "react-icons/ri";

function NotFound() {
  return (
    <div style={{ minHeight: "450px" }} className="_404div">
      <div>
        <div className="text-center mt-5">
          <RiNumber4 size={100} />
          <BiSad size={100} />
          <RiNumber4 size={100} />
          <p className="mt-4">The page you are looking for doesn't exist</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
