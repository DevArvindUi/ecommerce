import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import { toast } from "react-toastify";

const PageBySlug = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState({});

  useEffect(() => {
    getContentBySlug();
  }, [slug]);

  const getContentBySlug = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cms_pages/${slug}`);
      setdata(res.data.data);
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

  return (
    <div className="static_pages_div my-5">
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default PageBySlug;
