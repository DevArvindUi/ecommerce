import React, { useRef } from "react";
import AppDrawer from "../../components/common/AppDrawer/AppDrawer";

export default function UltraNavBar({ cartToggle, searchToggle, signInToggle, wishListToggle, navLink, isDesktop, categories, isScrolled, logo, token, cart, wishlist }) {
   const drawerRef = useRef();
   return (
      <div> 
         <button onClick={() => cartToggle()}>cart Toggle</button>
         <button onClick={searchToggle}>search Toggle</button>
         <button onClick={signInToggle}>signIn Toggle</button>
         <button onClick={wishListToggle}>wishList Toggle</button>
         <button
            onClick={() => {
               navLink("/abc");
               drawerRef?.current?.setOpen(false);
            }}>
            abc
         </button>
         <button onClick={() => drawerRef?.current?.setOpen(true)}>menu</button>
         <AppDrawer ref={drawerRef} fragment={!isDesktop}>
            {categories?.map((category) => (
               <ul>
                  <li>{category?.name}</li>
                  {category?.childrens?.map((subcategory) => (
                     <ul>
                        <li>{subcategory?.name}</li>
                     </ul>
                  ))}
               </ul>
            ))}
         </AppDrawer>
      </div>
   );
}
