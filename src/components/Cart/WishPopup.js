import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { useWishlistGlobalContext } from "../../context/WishListContext";
import { StoreContext } from "../../context/store-settings-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const WishPopup = ({ wishListModal, setWishListModal }) => {
   const { wishlist, removeFromWishlist } = useWishlistGlobalContext();
   const { storeSettings } = useContext(StoreContext);
   const navigate = useNavigate();

   // ###### move to product details page #######
   const getProductDetails = (id, name) => {
      setWishListModal(false);
      navigate(`/product/${name}/${id}`);
   };

   return (
      <React.Fragment>
         <div className="cart_sidebar">
            <Modal
               show={wishListModal}
               onHide={() => {
                  setWishListModal(false);
               }}
               className="cart_modal">
               <div
                  className="close-icon"
                  onClick={() => {
                     setWishListModal(false);
                  }}>
                  <MdOutlineClose className="theme_icon_color" />
               </div>

               <Modal.Body>
                  <div>
                     <h4>My WishList</h4>
                     <hr />

                     {wishlist != "" && wishlist?.wishlist_items != "" && wishlist?.wishlist_items ? (
                        <div>
                           {wishlist?.wishlist_items
                              .sort((a, b) => a?.product_name.localeCompare(b?.product_name))
                              .map((val) => (
                                 <React.Fragment key={val.id}>
                                    <div className="mt-5">
                                       <div className="d-flex align-items-center">
                                          <div className="pe-auto cursor_class" onClick={() => getProductDetails(val.product_id, val?.product_name)}>
                                             <img
                                                src={`${val?.item?.image?.thumbnail ? val?.item?.image?.thumbnail : "/images/image-not-found.jpg"}`}
                                                alt={val?.product_name}
                                                className="cart_popup_image"
                                             />
                                          </div>
                                          <div className="cart_popup_description">
                                             <div className="d-flex justify-content-between">
                                                <div className="cart_desc" onClick={() => getProductDetails(val.product_id, val?.product_name)}>
                                                   <p className="mb-3 cart_popup_p cart_product_name">{val?.product_name}</p>
                                                   <p>
                                                      Unit Price : {storeSettings.currency_code} {val?.item?.sell_price}
                                                   </p>
                                                </div>
                                                <div className="cart_desc">
                                                   <p className="fw-bold" onClick={() => removeFromWishlist(val.id)}>
                                                      REMOVE
                                                   </p>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </React.Fragment>
                              ))}
                        </div>
                     ) : (
                        <React.Fragment>
                           <div className="text-center mt-5">
                              <img src="/images/not-found-alt.svg" alt="notfound" />
                              <h6 className="mt-4 mb-4">Your Wishlist is empty</h6>
                           </div>
                        </React.Fragment>
                     )}
                  </div>
               </Modal.Body>
            </Modal>
         </div>
      </React.Fragment>
   );
};

export default WishPopup;
