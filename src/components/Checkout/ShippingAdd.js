import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Button, Collapse } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import EditAddress from "./EditAddress";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { TailSpin } from "react-loader-spinner";
import { NewAddressForm } from "./NewAddressForm";
import { useNavigate } from "react-router-dom";

const ShippingAdd = ({ setaddress_id, address_id }) => {
  const token = localStorage.getItem("auth_token");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
  const [selectedAdd, setselectedAdd] = useState(initialAddress);
  //address
  const [addressinput, setaddressinput] = useState(initialAddress);

  const [formerror, setformerror] = useState({
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    pincode: "",
    state: "",
    city: "",
  });

  const [perror, setperror] = useState("");
  const [currentRadioValue, setCurrentRadioValue] = useState(address_id);
  const [address, setAddress] = useState([]);
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

  //get selected address from id
  const getSelectedAddress = async (address_id) => {
    try {
      const headers = { Authorization: `${token}` };
      const response = await axios.get(`${BASE_URL}/addresses/${address_id}`, {
        headers,
      });
      const data = response.data.data;
      setselectedAdd(data);
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  //edit modal toggle
  const editAddressToggle = (address_id) => {
    seteditAdressModal(true);
    getSelectedAddress(address_id);
  };

  //to show confirm dialog on delete
  const confirmsubmit = (address_id) => {
    confirmAlert({
      message: "Are you sure you want to delete this address?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteAddress(address_id),
          className: "theme_button",
        },
        {
          label: "No",
          onClick: () => {},
          className: "theme_button",
        },
      ],
    });
  };

  //delete address
  const deleteAddress = async (address_id) => {
    try {
      const headers = { Authorization: `${token}` };
      await axios.delete(`${BASE_URL}/addresses/${address_id}`, { headers });
      toast.success("Address deleted");
      getAddress();
    } catch (error) {
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
      setLoader(true);
      const headers = { Authorization: `${token}` };
      const add_response = await axios.get(`${BASE_URL}/addresses`, {
        headers,
      });
      setAddress(add_response.data.data);
      setLoader(false);
    } catch (error) {
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
      setLoader(false);
    }
  };

  //validate address form fields
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

  //radio button change event
  const handleradioChange = (target, address_id) => {
    setCurrentRadioValue(target.value);
    setaddress_id(address_id);
  };

  const handleDivClick = (addressId) => {
    let target = {value: addressId}
    handleradioChange(target, addressId);
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
        await axios.post(`${BASE_URL}/addresses`, requestBody, {
          headers,
        });
        setOpen(false);
        toast.success("address added");
        setaddressinput(initialAddress);
        setSelectedCity(initialStateCity);
        setSelectedState(initialStateCity);
        getAddress();
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
  return (
    <>
      {!loader ? (
        <>
          {address.length > 0 ? (
            <>
              <div className="form-check" style={{ paddingLeft: "0px" }}>
                {address.map((add, index) => (
                  <div
                    key={add.id}
                    className="radio_address cursor_class"
                    style={{ padding: " 22px 35px" }}
                    onClick={() => handleDivClick(add.id)}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="address_details">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="address"
                          id={add.id}
                          value={add.id}
                          checked={currentRadioValue == add.id}
                          onChange={(e) => handleradioChange(e.target, add.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          <div>
                            <div className="d-flex flex-column justify-content-around">
                              <p>
                                {add.full_name} , {add.mobile_number}
                              </p>
                              <p>
                                {add.address_line_1} {add.city}, {add.state},
                                {add.country} , {add.pincode}
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div>
                        <span>
                          <FiEdit
                            title="Edit address"
                            className="cursor_class theme_icon_color"
                            onClick={() => editAddressToggle(add.id)}
                          />
                        </span>
                      </div>
                      <div>
                        <span>
                          <AiOutlineDelete
                            title="Delete Address"
                            className="cursor_class theme_icon_color"
                            size={20}
                            onClick={() => confirmsubmit(add.id)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New address toggle button */}
              <div className="add_toggle_btn">
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="address-form"
                  aria-expanded={open}
                  className="theme_button"
                >
                  {open ? "- Add New Address" : "+ Add New Address"}
                </Button>
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
              </div>
            </>
          ) : (
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
          )}
        </>
      ) : (
        <div className="load_spinner">
          <TailSpin color="#000000" height={60} width={60} />
        </div>
      )}

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
    </>
  );
};
export default ShippingAdd;
