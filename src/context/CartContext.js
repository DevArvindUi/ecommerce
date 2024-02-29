import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import Cartreducer from "../reducer/CartReducer";
import { toast } from "react-toastify";

const CContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
};

const CartProvider = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const cartToken = localStorage.getItem("cart_token");

  const [state, dispatch] = useReducer(Cartreducer, initialState);

  // ######### function to remove item from cart starts###################

  const remove = async (cart_item_id) => {
    if (cartToken != null && token == null) {
      const headers = { CartAuthorization: `${cartToken}` };
      const response = await axios.delete(
        `${BASE_URL}/carts/remove_item/${cart_item_id}`,
        {
          headers,
        }
      );
      const cart = response.data;
      dispatch({
        type: "REMOVE",
        payload: cart.data,
      });
    }
    if (token != null && cartToken == null) {
      const headers = { Authorization: `${token}` };
      const response = await axios.delete(
        `${BASE_URL}/carts/remove_item/${cart_item_id}`,
        {
          headers,
        }
      );
      const cart = response.data;
      dispatch({
        type: "REMOVE",
        payload: cart.data,
      });
    }
  };

  // ######### function to remove item from cart ends###################

  // ######### function to increase item quantity starts###################

  const Increase = async (cart_item_id, quan, setblurClass) => {
    if (setblurClass !== undefined) {
      setblurClass(true);
    }
    const quantity = quan + 1;
    if (cartToken != null && token == null) {
      const headers = { CartAuthorization: `${cartToken}` };

      axios
        .put(
          `${BASE_URL}/carts/update_item_quantity/${cart_item_id}`,
          { quantity },
          { headers }
        )
        .then((res) => {
          const cart = res.data;
          if (setblurClass !== undefined) {
            setblurClass(false);
          }
          dispatch({
            type: "INCREASE",
            payload: cart.data,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.meta.message);
        });
    }

    if (token != null && cartToken == null) {
      const headers = { Authorization: `${token}` };
      const response = await axios.put(
        `${BASE_URL}/carts/update_item_quantity/${cart_item_id}`,
        { quantity },
        { headers }
      );
      const cart = response.data;
      if (setblurClass !== undefined) {
        setblurClass(false);
      }
      dispatch({
        type: "INCREASE",
        payload: cart.data,
      });
    }
    // const headers = { Authorization: `${token}` };
  };
  // ######### function to increase item quantity ends###################

  // ######### function to drcrease item quantity starts##################

  const Decrease = async (cart_item_id, quan, setblurClass) => {
    if (cartToken != null && token == null) {
      const headers = { CartAuthorization: `${cartToken}` };

      if (quan > 1) {
        if (setblurClass !== undefined) {
          setblurClass(true);
        }
        const quantity = quan - 1;
        const response = await axios.put(
          `${BASE_URL}/carts/update_item_quantity/${cart_item_id}`,
          { quantity },
          { headers }
        );

        const cart = response.data;
        if (setblurClass !== undefined) {
          setblurClass(false);
        }
        dispatch({
          type: "DECREASE",
          payload: cart.data,
        });
      }
    }
    if (token != null && cartToken == null) {
      const headers = { Authorization: `${token}` };
      if (quan > 1) {
        if (setblurClass !== undefined) {
          setblurClass(true);
        }
        const quantity = quan - 1;
        const response = await axios.put(
          `${BASE_URL}/carts/update_item_quantity/${cart_item_id}`,
          { quantity },
          { headers }
        );

        const cart = response.data;
        if (setblurClass !== undefined) {
          setblurClass(false);
        }
        dispatch({
          type: "DECREASE",
          payload: cart.data,
        });
      }
    }
  };
  // ######### function to drcrease item quantity ends##################

  // ######### function for add to cart starts##################

  const addItemToCart = async (cartInput) => {
    const { item_id, item_type, quantity } = cartInput;
    if (token == null && cartToken == null) {
      axios
        .post(`${BASE_URL}/carts/add_item`, {
          item_id,
          quantity,
          item_type,
        })
        .then((response) => {
          const cart = response.data;
          localStorage.setItem("cart_token", cart.data.cart_token);
          toast.success("Item added to cart!!");
          dispatch({
            type: "ADD_TO_CART",
            payload: cart.data,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.meta?.message);
        });
    }
    if (cartToken != null && token == null) {
      const headers = { CartAuthorization: `${cartToken}` };
      axios
        .post(
          `${BASE_URL}/carts/add_item`,
          { item_id, quantity, item_type },
          { headers }
        )
        .then((response) => {
          const cart = response.data;
          toast.success("Item added to cart!!");
          dispatch({
            type: "ADD_TO_CART",
            payload: cart.data,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.meta?.message);
        });
    }

    if (token != null && cartToken == null) {
      const headers = { Authorization: `${token}` };
      axios
        .post(
          `${BASE_URL}/carts/add_item`,
          { item_id, quantity, item_type },
          { headers }
        )
        .then((response) => {
          const cart = response.data;
          toast.success("Item added to cart!!");
          dispatch({
            type: "ADD_TO_CART",
            payload: cart.data,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.meta?.message);
        });
    }
  };
  // ######### function for add to cart ends##################

  // ######### function for apply coupon starts##################

  const applyCouponCode = (coupon_code, setcoupon_code, seterror) => {
    const headers = { Authorization: `${token}` };
    if (coupon_code === "") {
      seterror(true);
      return;
    }
    if (coupon_code !== "") {
      axios
        .post(`${BASE_URL}/carts/apply_coupon`, { coupon_code }, { headers })
        .then((res) => {
          const cart = res.data;
          setcoupon_code("");
          dispatch({
            type: "APPLY_COUPON",
            payload: cart.data,
          });
        })
        .catch((error) => {
          const cart = error.response.data.meta;
          setcoupon_code("");
          dispatch({
            type: "APPLY_COUPON_FAIL",
            payload: cart.message,
          });
        });
    }
  };
  // ######### function for apply coupon ends##################

  // ######### function for remove coupon starts##################

  const removeCouponCode = (coupon_code) => {
    const headers = { Authorization: `${token}` };
    axios
      .delete(`${BASE_URL}/carts/remove_coupon`, { headers })
      .then((res) => {
        const cart = res.data;
        dispatch({
          type: "REMOVE_COUPON",
          payload: cart.data,
        });
      })
      .catch((error) => {
       toast.error(error.response.data.meta.message);
      });
  };

  // ######### function for remove coupon ends##################

  // ######### function to fetch cart items starts##################

  const fetchAuthCart = async (userToken) => {
    // let headers;
    // if (userToken !== undefined) {
    //   headers = { Authorization: `${userToken}` };
    // } else {
    //   headers = { Authorization: `${token}` };
    // }
    let headers = { Authorization: `${userToken}` };
    const response = await fetch(`${BASE_URL}/carts`, { headers });
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart.data });
  };

  const fetchCart = async () => {
    const headers = { CartAuthorization: `${cartToken}` };
    const response = await fetch(`${BASE_URL}/carts`, { headers });
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart.data });
  };
  // ######### function to fetch cart items ends##################

  useEffect(() => {
    if (token != null) {
      fetchAuthCart(token);
    }
    if (cartToken != null) {
      fetchCart();
    }
  }, []);

  return (
    <CContext.Provider
      value={{
        ...state,
        remove,
        Increase,
        Decrease,
        addItemToCart,
        applyCouponCode,
        removeCouponCode,
        fetchAuthCart,
        fetchCart,
      }}
    >
      {children}
    </CContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(CContext);
};

export { CContext, CartProvider };
