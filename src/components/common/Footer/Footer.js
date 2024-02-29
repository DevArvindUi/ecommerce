import React, { useContext, useEffect, useState } from "react";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoFacebook,
} from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../../../config/api";
import { StoreContext } from "../../../context/store-settings-context";
import Widgets from "./Widgets";
import Copyright from "./Copyright";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const { storeSettings } = useContext(StoreContext);
  const [fData, setfData] = useState([]);
  const [topCategory, setTopCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFooterPages();
    getProductsCall();
  }, []);

  const getFooterPages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cms_pages`);
      setfData(res.data.data);
    } catch (error) {
      if(error?.response?.data?.meta?.message === "Token expired."){
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest")
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };
  
  const getProductsCall = async () => {
    try {
      const cat_response = await axios.get(`${BASE_URL}/categories`);
      const cat_data = cat_response.data.data;
      setTopCategory(cat_data);
    } catch (error) {
      if(error?.response?.data?.meta?.message === "Token expired."){
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest")
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };
  
  const footerdata = {
    widgets: [
      {
        id: 1,
        widgetTitle: "Follow us on",
        lists: [
          {
            id: 1,
            title: "Instagram",
            slug: storeSettings.instagram_url,
            icon: <IoLogoInstagram />,
          },
          {
            id: 2,
            title: "Twitter",
            slug: storeSettings.twitter_url,
            icon: <IoLogoTwitter />,
          },
          {
            id: 3,
            title: "Facebook",
            slug: storeSettings.facebook_url,
            icon: <IoLogoFacebook />,
          },
          {
            id: 4,
            title: "Youtube",
            slug: storeSettings.youtube_url,
            icon: <IoLogoYoutube />,
          },
        ],
      },
      {
        id: 2,
        widgetTitle: "Help",
        lists: [
          {
            id: 1,
            title: "Contact us",
            slug: "/contact-us",
          },

          {
            id: 2,
            title: storeSettings.customer_support_email,
            slug: "#",
          },
          {
            id: 3,
            title: storeSettings.customer_care_number,
            slug: "#",
          },
        ],
      },
      {
        id: 3,
        widgetTitle: "Informations",
        lists: fData,
      },
      {
        id: 4,
        widgetTitle: "Quick Links",
        lists: [
          {
            id: 1,
            title: "FAQ",
            slug: "/faqs",
          },
        ],
      },

      {
        id: 6,
        widgetTitle: "Top Categories",
        lists: topCategory,
      },
    ],
    payment: [
      {
        id: 1,
        slug: "/",
        image: "/images/payment/paymentmethod.svg",
        name: "paymentmethod",
        width: '100%',
        height: '100%',
      },
    ],
  };

  return (
    <footer className="mt-4" style={{ border: "1px solid #e8e8e8" }}>
      <Widgets widgets={footerdata.widgets} />
      <hr />
      <Copyright payment={footerdata.payment} />
    </footer>
  );
};

export default Footer;
