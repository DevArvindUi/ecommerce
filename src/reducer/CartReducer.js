import { toast } from "react-toastify";

const Cartreducer = (state, action) => {
   // ############# REMOVE ITEM FROM CART ############
   if (action.type === "REMOVE") {
      toast.success("Item removed from cart!!");

      return {
         ...state,
         cart: action.payload,
      };
   }

   // ############# INCREASE DECREASE ITEM QUANTITY ############
   if (action.type === "INCREASE" || action.type === "DECREASE") {
      return {
         ...state,
         cart: action.payload,
      };
   }

   // ############# ADD ITEMS TO CART ############
   if (action.type === "ADD_TO_CART") {
      return {
         ...state,
         cart: action.payload,
      };
   }

   // ############# APPLY COUPON ############
   if (action.type === "APPLY_COUPON") {
      toast.success("Coupon Applied!!");
      return {
         ...state,
         cart: action.payload,
      };
   }

   // ############# APPLY COUPON FAIL############
   if (action.type === "APPLY_COUPON_FAIL") {
      toast.error(action.payload);
   }

   // ############# REMOVE COUPON ############
   if (action.type === "REMOVE_COUPON") {
      toast.success("Coupon Removed!!");
      return {
         ...state,
         cart: action.payload,
      };
   }

   // ############# FETCH AND DISPLAY CART ITEMS ############
   if (action.type === "DISPLAY_ITEMS") {
      return { ...state, cart: action.payload, loading: false };
   }

   return state;
};

export default Cartreducer;
