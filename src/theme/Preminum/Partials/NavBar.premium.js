import React, { useRef } from "react";
import AppDrawer from "../../../components/common/AppDrawer/AppDrawer";
import { Link } from "react-router-dom";
import Search from "../../../components/Search/Search";
import { FiShoppingCart } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";

export default function PremiumNavBar({ cartToggle, searchToggle, signInToggle, wishListToggle, navLink, isDesktop, categories, isScrolled, logo, token, cart, wishlist }) {
   const drawerRef = useRef();
   return (
      <header
         className={`container-fluid ${!isDesktop ? "position-fixed" : "position-relative"} z-12 w-100 py-2 blur`}
         style={{ zIndex: "1000", top: 0, backdropFilter: `blur(${isScrolled ? "4px" : "0px"})`, backgroundColor: `rgba(255, 255, 255, ${isScrolled ? 0.4 : 0})` }}>
         <nav className="row px-md-5 py-2">
            <div className="col-8 d-flex align-items-center">
               <Link to="/">
                  <img src={logo} alt="logo" width={180} />
               </Link>
            </div>
            <div className={`col-4 col-md-4 d-flex align-items-center justify-content-end`}>
               {/* search */}
               {isDesktop ? (
                  ""
               ) : (
                  <div className="input-group input-group-sm d-flex align-items-center bg-light px-3" style={{ width: "267px", borderRadius: "8px", height: "40px" }} onClick={searchToggle}>
                     <span>
                        {/*  <Search searchToggle={searchToggle} /> */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M14.6363 15.697C14.9292 15.9899 15.4041 15.9899 15.697 15.697C15.9899 15.4041 15.9899 14.9292 15.697 14.6363L14.6363 15.697ZM11.9167 6.83334C11.9167 9.64078 9.64078 11.9167 6.83334 11.9167V13.4167C10.4692 13.4167 13.4167 10.4692 13.4167 6.83334H11.9167ZM6.83334 11.9167C4.02589 11.9167 1.75 9.64078 1.75 6.83334H0.25C0.25 10.4692 3.19746 13.4167 6.83334 13.4167V11.9167ZM1.75 6.83334C1.75 4.02589 4.02589 1.75 6.83334 1.75V0.25C3.19746 0.25 0.25 3.19746 0.25 6.83334H1.75ZM6.83334 1.75C9.64078 1.75 11.9167 4.02589 11.9167 6.83334H13.4167C13.4167 3.19746 10.4692 0.25 6.83334 0.25V1.75ZM10.4697 11.5303L14.6363 15.697L15.697 14.6363L11.5303 10.4697L10.4697 11.5303Z"
                              fill="#807D7E"
                           />
                        </svg>
                     </span>
                     <input type="text" className="form-control border-0 bg-white" placeholder="Search" disabled />
                  </div>
               )}
               {/* wishlist */}
               <span className="d-flex align-items-center">
                  <div className="bg-light d-flex justify-content-center align-items-center p-2 rounded-3 hMenu position-relative mx-2">
                     <AiOutlineHeart color="grey" size={20} onClick={token == null ? () => signInToggle(true) : wishListToggle} className="cursor_class" />
                     <div className="badge">
                        <span className="txt-14">{token && wishlist && wishlist?.wishlist_count ? wishlist?.wishlist_count : 0}</span>
                     </div>
                  </div>
               </span>

               {/* sign in */}
               <div className="bg-light d-flex justify-content-center align-items-center p-2 rounded-3 hMenu mx-2">
                  <span className="d-flex align-items-center">
                     {token ? (
                        <AiOutlineUser
                           size={20}
                           color="grey"
                           onClick={() => {
                              navLink("/my-account/orders", { replace: true });
                           }}
                           className="cursor_class"
                        />
                     ) : (
                        <BiLogInCircle size={20} color="grey" onClick={signInToggle} className="cursor_class" />
                     )}
                  </span>
               </div>
               {/* cart */}
               <div className="bg-light d-flex justify-content-center align-items-center p-2 rounded-3 hMenu position-relative">
                  <FiShoppingCart color="grey" size={20} onClick={cartToggle} className="cursor_class" />
                  <div className="badge">
                     <span className="txt-14">{cart?.total_quantity ? cart?.total_quantity : 0}</span>
                  </div>
               </div>
               {/* Menu */}
               {isDesktop && (
                  <span className="d-flex align-items-center">
                     <div className="bg-light d-flex justify-content-center align-items-center p-2 rounded-3 hMenu position-relative mx-2">
                        <CgMenuRightAlt //
                           color="grey"
                           size={20}
                           onClick={() => drawerRef?.current?.setOpen(true)}
                        />
                     </div>
                  </span>
               )}
            </div>
         </nav>
         {isDesktop && (
            <AppDrawer ref={drawerRef} fragment={!isDesktop}>
               <Link to="/">
                  <img src={logo} alt="logo" className="p-2" />
               </Link>
               <div className="my-3">
                  {categories?.map((category) => (
                     <ul className="list-group list-group border-0">
                        <li className="list-group-item d-flex justify-content-between align-items-start px-2 border-0">
                           <div className="ms-2 me-auto">
                              <div className="fw-bold"> {category?.name}</div>
                              {category?.childrens?.map((subcategory, idx) => (
                                 <React.Fragment key={idx}>
                                    <span>&nbsp;&nbsp;&nbsp;{subcategory?.name}</span>
                                 </React.Fragment>
                              ))}
                           </div>
                           {/* <span className="badge bg-primary rounded-pill">14</span> */}
                        </li>
                     </ul>
                  ))}
               </div>
            </AppDrawer>
         )}
      </header>
   );
}
