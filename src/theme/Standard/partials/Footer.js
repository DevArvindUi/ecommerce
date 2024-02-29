import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/store-settings-context";
import { BASE_URL } from "../../../config/api";
import axios from "axios";
import { IoLogoTwitter, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
   const [topCategories, setTopCategories] = useState([]);
   const [footerPages, setFooterPages] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      getTopCategories();
      getFooterPages();
   }, []);

   const getTopCategories = async () => {
      try {
         const cat_response = await axios.get(`${BASE_URL}/categories`);
         const cat_data = cat_response.data.data;
         setTopCategories(cat_data);
      } catch (error) {
         if (error?.response?.data?.meta?.message === "Token expired.") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("isGuest");
            navigate("/", { replace: true });
            window.location.reload(false);
         }
      }
   };

   const getFooterPages = async () => {
      try {
         const res = await axios.get(`${BASE_URL}/cms_pages`);
         setFooterPages(res.data.data);
      } catch (error) {
         if (error?.response?.data?.meta?.message === "Token expired.") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("isGuest");
            navigate("/", { replace: true });
            window.location.reload(false);
         }
      }
   };

   const { storeSettings } = useContext(StoreContext);
   return (
      <div className="container-fluid border-top p-5">
         <div className="row my-5">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
               <img src={storeSettings.logo} alt="logo" />
               <p className="my-3 text-secondary">{storeSettings.address}</p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
               <p className="text-secondary">Informations</p>
               {footerPages.map((page) => (
                  <Link className="text-capitalize text-decoration-none text-dark" to={page?.slug ? `/get-to-know-us/${page.slug}` : "#"} key={page.id}>
                     <p className="mt-3">{page.title}</p>
                  </Link>
               ))}
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
               <p className="text-secondary">Top Categories</p>
               {topCategories.map((category) => (
                  <Link key={category.id} to={category.id ? `/search?category_ids[]=${category.id}` : "#"} className="text-decoration-none text-dark">
                     <p className="mt-3">{category.name}</p>
                  </Link>
               ))}
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
               <p className="text-secondary">Get in touch</p>
               <p>Join now 55,000 people getting our emails </p>
            </div>
         </div>

         <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center">
               <div className="d-flex gap-5 ">
                  <Link to="/contact-us" className="text-decoration-none text-secondary">
                     <p>Contact us</p>
                  </Link>
                  <Link to="/faqs" className="text-decoration-none text-secondary">
                     <p>FAQ</p>
                  </Link>
               </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center text-secondary">
               <p>Copyright @2023 Witmates</p>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center text-secondary">
               <div className="d-flex gap-3 justify-content-center">
                  <IoLogoFacebook size={20} />
                  <IoLogoTwitter size={20} />
                  <IoLogoLinkedin size={20} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
