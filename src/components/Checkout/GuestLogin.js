import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewAddressForm } from "./NewAddressForm";
import { BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const initialAddress = {
  full_name: "",
  email: "",
  mobile_number: "",
  address_line_1: "",
  address_line_2: "",
  landmark: "",
  pincode: "",
  country: "India",
};

const GuestLogin = ({
  setactiveStep,
  setGuestLogin,
  setscreen,
  setaddress_id,
  address_id,
  sendAddress,
}) => {
  const cartToken = localStorage.getItem("cart_token");
  const { fetchAuthCart } = useGlobalContext();
  const navigate = useNavigate();
  const [addressinput, setaddressinput] = useState(initialAddress);
  const [formerror, setformerror] = useState({
    email: "",
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [perror, setperror] = useState("");
  const [selectedState, setSelectedState] = useState({
    label: "",
    value: "",
  });
  const [selectedCity, setSelectedCity] = useState({
    label: "",
    value: "",
  });

  useEffect(() => {
    if (address_id !== "") {
      sendAddress();
    }
  }, [address_id]);

  //validate address form fields
  const validate = (name, value) => {
    switch (name) {
      case "full_name":
        if (!value || value.trim() === "") {
          return "Name is Required";
        } else {
          return "";
        }

      case "email":
        if (!value || value.trim() === "") {
          return "Email is Required";
        } else if (!value.match(/^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i)) {
          return "Please enter a valid email";
        } else {
          return "";
        }

      case "mobile_number":
        if (!value || value.trim() === "") {
          return "Mobile number is Required";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return "Please enter a valid phone number";
        } else {
          return "";
        }
      case "address_line_1":
        if (!value) {
          return "Address is Required";
        } else {
          return "";
        }
      case "pincode":
        if (!value) {
          return "PinCode is required";
        } else if (!value.match(/^\d{6}$/)) {
          return "Please enter a 6 digits pincode";
        } else {
          return "";
        }
      case "city":
        if (value === "") {
          return "City is required";
        } else {
          return "";
        }
      case "state":
        if (value === "") {
          return "State is required";
        } else {
          return "";
        }
      case "country":
        if (!value) {
          return "Not found";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  //address input field change handler
  const handleadd = (e) => {
    const { name, value } = e.target;
    setformerror({
      ...formerror,
      [name]: validate(name, value),
    });

    setaddressinput((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pincode" && value.length !== 6) {
      setperror("");
    }
  };

  const handleGuestCheckout = (event) => {
    event.preventDefault();
    let validationErrors = {};
    Object.keys(addressinput).forEach((name) => {
      const error = validate(name, addressinput[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    if (selectedState || !selectedState) {
      const stateError = validate(
        "state",
        selectedState ? selectedState.label : ""
      );
      if (stateError && stateError.length > 0) {
        validationErrors.state = stateError;
      }
    }

    if (selectedCity || !selectedCity) {
      const cityError = validate(
        "city",
        selectedCity ? selectedCity.label : ""
      );
      if (cityError && cityError.length > 0) {
        validationErrors.city = cityError;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setformerror(validationErrors);
      return;
    }

    const requestBody = { ...addressinput };

    if (selectedCity) {
      requestBody.city = selectedCity.label;
    }

    if (selectedState) {
      requestBody.state = selectedState.label;
      requestBody.state_id = selectedState.value;
    }
    if (
      addressinput.email &&
      addressinput.full_name &&
      addressinput.mobile_number &&
      addressinput.address_line_1 &&
      addressinput.pincode &&
      addressinput.country
    ) {
      if (cartToken != null) {
        const headers = { CartAuthorization: `${cartToken}` };
        axios
          .post(`${BASE_URL}/carts/guest_checkout`, requestBody, { headers })
          .then((res) => {
            localStorage.setItem("auth_token", res.data.data.token);
            localStorage.removeItem("cart_token");
            toast.success("you are successfully logged in!!");
            let user_token = res?.data?.data?.token;
            if (res.data.data.address.id) {
              setaddress_id(res.data.data.address.id);
            }
            if (user_token) {
              fetchAuthCart(user_token);
            }
            setactiveStep(1);
            setGuestLogin(true);
            localStorage.setItem("isGuest", "true");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.meta?.message);
            setaddressinput(initialAddress);
            setSelectedCity(null);
            setSelectedState(null);
            if (error?.response?.data?.meta?.message === "Token expired.") {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("isGuest");
              navigate("/", { replace: true });
              window.location.reload(false);
            }
          });
      }
    }
  };

  return (
    <NewAddressForm
      handleadd={handleadd}
      addressinput={addressinput}
      formerror={formerror}
      perror={perror}
      handleGuestCheckout={handleGuestCheckout}
      setscreen={setscreen}
      setGuestLogin={setGuestLogin}
      setSelectedState={setSelectedState}
      setSelectedCity={setSelectedCity}
      selectedCity={selectedCity}
      selectedState={selectedState}
      setformerror={setformerror}
      validate={validate}
      isGuest
    />
  );
};

export default GuestLogin;
