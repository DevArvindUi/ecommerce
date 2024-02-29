import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import EditAddress from "../Checkout/EditAddress";
import { TailSpin } from "react-loader-spinner";

import { Button, Collapse } from "react-bootstrap";
import { NewAddressForm } from "../Checkout/NewAddressForm";
import { useNavigate } from "react-router-dom";

const initialAddress = {
  full_name: "",
  mobile_number: "",
  address_line_1: "",
  address_line_2: "",
  landmark: "",
  pincode: "",
  country: "India",
};

const initialStateCity ={
  label: "",
  value: "",
}

const Address = () => {
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  //states
  const [open, setOpen] = useState(false);
  const [myaddress, setmyaddress] = useState([]);
  const [loader, setloader] = useState(true);
  const [perror, setperror] = useState("");
  const [formerror, setformerror] = useState({
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [selectedAdd, setselectedAdd] = useState(initialAddress);

  //address
  const [addressinput, setaddressinput] = useState(initialAddress);

  const [editAdressModal, seteditAdressModal] = useState(false);
  const [selectedState, setSelectedState] = useState(initialStateCity);
  const [selectedCity, setSelectedCity] = useState(initialStateCity);

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (selectedAdd) {
      setSelectedState({
        label: selectedAdd.state,
        value: selectedAdd.state_id,
      });
      setSelectedCity({ label: selectedAdd.city, value: "" });
    }
  }, [selectedAdd]);

  const getSelectedAddress = async (address_id) => {
    try {
      const headers = { Authorization: `${token}` };
      const response = await axios.get(`${BASE_URL}/addresses/${address_id}`, {
        headers,
      });
      const data = response.data.data;
      setselectedAdd(data);
    } catch (error) {
      toast.error(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const editAddressToggle = (address_id) => {
    seteditAdressModal(true);
    getSelectedAddress(address_id);
  };

  const handleaccSubmit = async (e) => {
    e.preventDefault();
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
      addressinput.full_name &&
      addressinput.mobile_number &&
      addressinput.address_line_1 &&
      addressinput.pincode
    ) {
      const headers = { Authorization: `${token}` };

      try {
        const res = await axios.post(`${BASE_URL}/addresses`, requestBody, {
          headers,
        });
        setOpen(false);
        toast.success("address added");
        setSelectedCity(initialStateCity);
        setSelectedState(initialStateCity);
        getAddress();
        setaddressinput(initialAddress);
      } catch (error) {
        toast.error(error?.response?.data?.meta?.message);
        setaddressinput(initialAddress);
        setSelectedCity(initialStateCity);
        setSelectedState(initialStateCity);
        if (error?.response?.data?.meta?.message === "Token expired.") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest");
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      }
    }
  };
  const handleDelete = (address_id) => {
    confirmAlert({
      message: "Are you sure you want to delete this address?",
      buttons: [
        {
          label: "Yes",
          className: "theme_button",
          onClick: () => deleteAddress(address_id),
        },
        {
          label: "No",
          className: "theme_button",
          onClick: () => {},
        },
      ],
    });
  };

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
  //delete address
  const deleteAddress = async (address_id) => {
    try {
      const headers = { Authorization: `${token}` };
      await axios.delete(`${BASE_URL}/addresses/${address_id}`, { headers });
      toast.success("Address deleted");
      getAddress();
    } catch (error) {
      toast.error(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  //get address
  const getAddress = async () => {
    try {
      setloader(true);
      const headers = { Authorization: `${token}` };
      const add_response = await axios.get(`${BASE_URL}/addresses`, {
        headers,
      });
      setmyaddress(add_response.data.data);
      setloader(false);
    } catch (error) {
      toast.error(error?.response?.data?.meta?.message);
      setloader(false);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };
  const validate = (name, value) => {
    switch (name) {
      case "full_name":
        if (!value || value.trim() === "") {
          return "Name is Required";
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
  return (
    <React.Fragment>
      {!loader ? (
        <>
          <h5 className="mb-4 mx-4">My Address</h5>
          {myaddress.length > 0 ? (
            <div className="form-check mobile_form_check">
              {myaddress.map((add, index) => (
                <div key={add.id} className="radio_address">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex" style={{ width: "50%" }}>
                      <div>
                        <TiLocationOutline
                          size={20}
                          className="theme_icon_color"
                        />
                      </div>
                      <div
                        className="d-flex flex-column justify-content-around add_div"
                        style={{ marginLeft: "14px" }}
                      >
                        <p>
                          {add.full_name} , {add.mobile_number}
                        </p>
                        <p>
                          {add.address_line_1} {add.city}, {add.state},
                          {add.country} , {add.pincode}
                        </p>
                        {add.landmark ? <p>Landmark : {add.landmark}</p> : ""}
                      </div>
                    </div>

                    <div>
                      <span>
                        <FiEdit
                          title="Edit address"
                          className="theme_icon_color cursor_class"
                          onClick={() => editAddressToggle(add.id)}
                        />
                      </span>
                    </div>
                    <div>
                      <span>
                        <AiOutlineDelete
                          title="Delete Address"
                          className="theme_icon_color cursor_class"
                          size={20}
                          onClick={() => handleDelete(add.id)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="add_toggle_btn">
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="address-form"
                  aria-expanded={open}
                  className="theme_button"
                >
                  {open ? "- Add New Address" : "+ Add New Address"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="address_not_found">
              <div>
                <TiLocationOutline size={60} className="theme_icon_color" />
                <h4 className="mt-4">No Address Found</h4>
                <p>
                  Please complete your address information by clicking this
                  button below
                </p>
                <button
                  className="theme_button mb-4"
                  style={{ padding: "2px 20px", borderRadius: "10px" }}
                  onClick={() => setOpen(!open)}
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin height={60} width={60} className="theme_icon_color" />
        </div>
      )}
      <Collapse in={open}>
        <div id="address-form">
          <NewAddressForm
            handleadd={handleadd}
            addressinput={addressinput}
            formerror={formerror}
            perror={perror}
            handleaccSubmit={handleaccSubmit}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
            selectedCity={selectedCity}
            selectedState={selectedState}
            setformerror={setformerror}
            validate={validate}
          />
        </div>
      </Collapse>
      <EditAddress
        seteditAdressModal={seteditAdressModal}
        validate={validate}
        editAdressModal={editAdressModal}
        selectedAdd={selectedAdd}
        setselectedAdd={setselectedAdd}
        getAddress={getAddress}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        selectedState={selectedState}
      />
    </React.Fragment>
  );
};
export default Address;
