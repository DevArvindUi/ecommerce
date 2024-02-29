import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingBasketLine } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
import Pagination from "../common/Pagination/Pagination";
import { StoreContext } from "../../context/store-settings-context";
import { toast } from "react-toastify";

const Order = () => {
  const [order, setOrder] = useState([]);
  const orderToken = localStorage.getItem("auth_token");
  const {storeSettings} = useContext(StoreContext);
  const [loader, setloader] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    orderSummary();
  }, []);

  //fetch all orders
  const orderSummary = async () => {
    try{
      setloader(true);
      const headers = { Authorization: `${orderToken}` };
      const response = await axios.get(`${BASE_URL}/orders/my_orders`, {
        headers,
      });
      setOrder(response.data.data);
      setloader(false);
    }catch (error){
      toast.error(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  // / Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = order.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  return (
    <>
      {!loader ? (
        <>
          <h5 className="mb-4 mx-4">My Orders</h5>
          {order.length > 0 ? (
            <div className="order-listing">
              {currentPosts.map((order) => (
                <div
                  className="radio_address"
                  style={{ fontSize: "14px", padding: "30px 30px" }}
                  key={order.id}
                >
                  <p className="mb-4">
                    Order date : {""}
                    <span style={{ color: "dimgray" }}>{order.created_at}</span>
                  </p>
                  <div
                    className="order_card_content"
                    style={{ lineHeight: "14px" }}
                  >
                    <div className="inner_div">
                      <p style={{ color: "dimgray" }}>Order ID</p>
                      <p style={{ fontWeight: "bolder" }}>
                        {order.invoice_number}
                      </p>
                    </div>
                    <div className="inner_div">
                      <p style={{ color: "dimgray" }}>Order Amount</p>
                      <p style={{ fontWeight: "bolder" }}>
                        {storeSettings.currency_code}

                        <span style={{ marginLeft: " 6%" }}>{order.total}</span>
                      </p>
                    </div>
                    <div className="inner_div">
                      <p style={{ color: "dimgray" }}>Status</p>
                      <p style={{ fontWeight: "bolder" }}>{order.status}</p>
                    </div>
                    <div>
                      <Link to={`${order.id}`}>
                        <button
                          className="theme_button"
                          style={{ padding: "13px 10px", borderRadius: "8px" }}
                        >
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="order_not_found">
              <div>
                <RiShoppingBasketLine size={70} />
                <h4 className="mt-4">No Orders Yet!</h4>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}

      {order.length > 3 && (
        <Pagination
          currentPage={currentPage}
          postPerPage={postPerPage}
          totalPosts={order.length}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default Order;
