import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import {TiLocationOutline} from "react-icons/ti";
import { confirmAlert } from "react-confirm-alert";

const Myaccount = () => {
  const navigate = useNavigate();

  //logout action
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("isGuest")
    navigate("/", { replace: true });
    window.location.reload(false);
  };

  const handleLogout = () => {
    confirmAlert({
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          className: "theme_button",
          onClick: () => logout(),
        },
        {
          label: "No",
          className: "theme_button",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div className="account_tab_main">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 account_leftpane">
            <div className="account_tab">
              <Link to="orders" className="account_anchor">
                <AiOutlineShoppingCart size={25} className="theme_icon_color"/>
                <span className="account_link">My Orders</span>
              </Link>
            </div>
            <div className="account_tab">
              <Link to="address" className="account_anchor">
                <TiLocationOutline size={25} className="theme_icon_color"/>
                <span className="account_link">My Addresses</span>
              </Link>
            </div>
            <div className="account_tab">
              <Link to="details" className="account_anchor">
                <BsPerson size={25} className="theme_icon_color"/>
                <span className="account_link">Account Details</span>
              </Link>
            </div>
            <div className="account_tab" onClick={handleLogout}> 
              <IoLogOutOutline size={25} className="theme_icon_color"/>
              <span className="cursor_class account_link">
                Logout
              </span>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
