import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import WishlistReducer from "../reducer/WishlistReducer";

const WishlistContext = React.createContext();

const initialState = {
  loading: false,
  wishlist: {},
};

const WishlistProvider = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const [state, dispatch] = useReducer(WishlistReducer, initialState);


  // ######### function for add to wishlist starts##################
  const addToWishlist = async (wishlistInput) => {
    const { item_id, item_type } = wishlistInput;
    if (token != null) {
      const headers = { Authorization: `${token}` };
      try {
        const response = await axios.post(
          `${BASE_URL}/wishlists/add_item`,
          { item_id, item_type },
          { headers }
        );
        const wishlist = response.data.data;
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: { wishlist },
        });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  }
  // ######### function for add to wishlist ends##################

  // ######### function to remove item from wishlist starts###################
  const removeFromWishlist = async (wishlist_item_id) => {
    if (token != null) {
      const headers = { Authorization: `${token}` };
      const response = await axios.delete(
        `${BASE_URL}/wishlists/remove_item/${wishlist_item_id}`,
        {
          headers,
        }
      );
      const wishlist = response.data.data;
      // setIsWishlisted!==undefined && wishlist && setIsWishlisted(false);
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { wishlist, wishlist_item_id },
      });
    }
  };
  // ######### function to remove item from wishlist ends###################

  // ######### function to fetch wishlist items starts##################
  const fetchWishlistItems = async (userToken) => {
    let headers;
    if(userToken!==undefined){
      headers = { Authorization: `${userToken}` };
    }
    else{
      headers = { Authorization: `${token}` };
    }
    const response = await fetch(`${BASE_URL}/wishlists`, { headers });
    const wishlist = await response.json();
    dispatch({ type: "DISPLAY_WISHLIST_ITEMS", payload: wishlist.data });
  };
  // ######### function to fetch wishlist items ends##################

  useEffect(() => {
    if (token != null) {
      fetchWishlistItems();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        fetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// make sure use
export const useWishlistGlobalContext = () => {
  return useContext(WishlistContext);
};

export { WishlistContext, WishlistProvider };
