import { toast } from "react-toastify";

const WishlistReducer = (state, action) => {
  // ############# REMOVE ITEM FROM WISHLIST ############
  if (action.type === "REMOVE_FROM_WISHLIST") {
    toast.error("Item removed from wishlist!!");
    return {
      ...state,
      wishlist: {
        ...state.wishlist,
        wishlist_count: action.payload.wishlist.wishlist_count,
        wishlist_items: state.wishlist.wishlist_items.filter(
          (ele) => ele.id !== action.payload.wishlist_item_id
        ),
      },
    };
  }

  // ############# ADD ITEMS TO WISHLIST ############
  if (action.type === "ADD_TO_WISHLIST") {
    toast.success("Item added to wishlist!!");
    if(state?.wishlist?.wishlist_items?.length>0){
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlist_count: action.payload.wishlist.wishlist_count,
          wishlist_items: [
            ...state.wishlist.wishlist_items,
            action.payload.wishlist,
          ],
        },
      };
    }
    else{
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlist_count: action.payload.wishlist.wishlist_count,
          wishlist_items: [
            action.payload.wishlist,
          ],
        },
      };
    }
   
  }

  // ############# FETCH AND DISPLAY WISHLIST ITEMS ############
  if (action.type === "DISPLAY_WISHLIST_ITEMS") {
    return { ...state, wishlist: action.payload, loading: false };
  }

  return state;
};

export default WishlistReducer;
