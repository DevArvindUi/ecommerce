import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditAddress = (props) => {
  const {
    seteditAdressModal,
    editAdressModal,
    selectedAdd,
    setselectedAdd,
    getAddress,
    validate,
    setSelectedState,
    setSelectedCity,
    selectedCity,
    selectedState,
  } = props;

  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const isInputPreviouslyBlurred = React.useRef(false);
  const [formerror, setformerror] = useState({
    full_name: "",
    mobile_number: "",
    address_line_1: "",
    pincode: "",
  });

    const [perror, setperror] = useState("");

  //edit form fields change event
  const addresshandleChange = (e) => {
    const { name, value } = e.target;
    setformerror({
      ...formerror,
      [name]: validate(name, value),
    });

    setselectedAdd((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pincode" && value.length !== 6) {
      setperror("");
    }
  };

  const handleStateChange = (obj) => {
    setSelectedState(obj);
    getCitiesOfState(obj);
    if (obj) {
      setformerror({
        ...formerror,
        ["state"]: validate("state", obj.label),
      });
    } else {
      setformerror({
        ...formerror,
        ["state"]: validate("state", ""),
      });
    }
  };

  const handleCityChange = (obj) => {
    setSelectedCity(obj);
    if (obj) {
      setformerror({
        ...formerror,
        ["city"]: validate("city", obj.label),
      });
    } else {
      setformerror({
        ...formerror,
        ["city"]: validate("city", ""),
      });
    }
  };

  const getCitiesOfState = async (obj) => {
    try {
      const cityResponse = await axios.get(
        `${BASE_URL}/addresses/get_cities/${obj.value}`
      );
      const city_data = cityResponse.data.data;
      setCityData(city_data.cities);
    } catch (error) {
      toast(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const getStates = async () => {
    try {
      const stateResponse = await axios.get(`${BASE_URL}/addresses/get_states`);
      const state_data = stateResponse.data.data;
      setStateData(state_data);
    } catch (error) {
      toast(error?.response?.data?.meta?.message);
      if (error?.response?.data?.meta?.message === "Token expired.") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isGuest");
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    }
  };

  const createOptionFromInputValue = () => {
    if (!inputValue) return;
    setformerror({
      ...formerror,
      ["city"]: validate("city", inputValue),
    });
    const obj = { label: inputValue, value: "" };
    setSelectedCity(obj);
  };

  const onInputBlur = (obj) => {
    isInputPreviouslyBlurred.current = true;
    createOptionFromInputValue();
  };

  useEffect(() => {
    getStates();
  }, []);
  

  useEffect(()=>{
    if (selectedAdd && selectedAdd.pincode && selectedAdd.pincode.trim() !== "") {
      const obj = {value: selectedAdd.state_id}
      getCitiesOfState(obj)
    }
  },[selectedAdd])
  //edit submit button click event

  const onEditSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    Object.keys(selectedAdd).forEach((name) => {
      const error = validate(name, selectedAdd[name]);
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
      // this.setState({ errors: validationErrors });
      setformerror(validationErrors);
      return;
    }
    const requestBody = { ...selectedAdd };

    if (selectedCity) {
      requestBody.city = selectedCity.label;
    }

    if (selectedState) {
      requestBody.state = selectedState.label;
      requestBody.state_id = selectedState.value;
    }

    if (
      selectedAdd.full_name &&
      selectedAdd.mobile_number &&
      selectedAdd.address_line_1 &&
      selectedAdd.pincode
    ) {
      const headers = { Authorization: `${token}` };
      try {
        const res = await axios.put(
          `${BASE_URL}/addresses`,
          requestBody,

          {
            headers,
          }
        );
        getAddress();
        seteditAdressModal(false);
        setSelectedState(null)
        setSelectedCity(null)
        toast.success("Address updated successfully");
      } catch (error) {
        toast.error(error?.response?.data?.meta?.message);
        setSelectedState(null)
        setSelectedCity(null)
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
      <Modal
        centered
        show={editAdressModal}
        onHide={() => {
          seteditAdressModal(false);
          setSelectedState(null)
          setSelectedCity(null)
        }}
        className="edit_add"
      >
        <div
          className="close-icon"
          onClick={() => {
            seteditAdressModal(false);
            setSelectedState(null)
            setSelectedCity(null)
          }}
        >
          <MdOutlineClose />
        </div>
        <Modal.Body>
          <div className="check_form">
            <form autoComplete="off">
              <div className="form-group d-flex justify-content-between mt-3">
                <div style={{ width: "48%" }}>
                  <label>Full Name *</label>
                  <input
                    className="form-control"
                    type="text"
                    name="full_name"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.full_name || ""}
                  />
                  <span className="text-danger">{formerror.full_name}</span>
                </div>
                <div style={{ width: "48%" }}>
                  <label>Phone/Mobile *</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="mobile_number"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.mobile_number || ""}
                  />
                  <span className="text-danger">{formerror.mobile_number}</span>
                </div>
              </div>
              <div className="form-group d-flex justify-content-between mt-3">
                <div style={{ width: "48%" }}>
                  <label>Address Line 1*</label>
                  <textarea
                    name="address_line_1"
                    rows="2"
                    cols="30"
                    className="form-control"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.address_line_1 || ""}
                  />
                  <span className="text-danger">
                    {formerror.address_line_1}
                  </span>
                </div>

                <div style={{ width: "48%" }}>
                  <label>Address Line 2</label>
                  <textarea
                    name="address_line_2"
                    rows="2"
                    cols="30"
                    className="form-control"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.address_line_2 || ""}
                  />
                </div>
              </div>

              <div className="form-group d-flex justify-content-between mt-3  ">
                <div style={{ width: "48%" }}>
                  <label>State *</label>
                  <Select
                    // isClearable={true}
                    options={stateData.map((option) => ({
                      value: option.id,
                      label: option.name,
                    }))}
                    value={selectedState}
                    name="state"
                    onChange={handleStateChange} 
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label>City *</label>
                  <CreatableSelect
                    // isClearable={true}
                    options={cityData.map((option) => ({
                      value: option.id,
                      label: option.name,
                    }))}
                    value={selectedCity}
                    onChange={handleCityChange}
                    name="city"
                    onBlur={onInputBlur}
                    onInputChange={setInputValue}
                  />
                </div>
              </div>

              <div className="form-group d-flex justify-content-between mt-3  ">
                <div style={{ width: "48%" }}>
                  <label>Pincode *</label>
                  <input
                    className="form-control"
                    type="number"
                    name="pincode"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.pincode || ""}
                  />
                  {perror ? (
                    <span className="error-display">{perror}</span>
                  ) : null}
                  <span className="text-danger">{formerror.pincode}</span>
                </div>
                <div style={{ width: "48%" }}>
                  <label>Country *</label>
                  <input
                    className="form-control"
                    type="text"
                    name="country"
                    onChange={(e) => addresshandleChange(e)}
                    value={selectedAdd.country || ""}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="form-group mt-3  ">
                <label>Landmark</label>
                <input
                  className="form-control"
                  type="text"
                  name="landmark"
                  onChange={(e) => addresshandleChange(e)}
                  value={selectedAdd.landmark || ""}
                />
              </div>

              <div className="form-group mt-3">
                <button
                  onClick={onEditSubmit}
                  className="theme_button"
                  type="submit"
                  style={{ padding: "12px 20px", borderRadius: "10px" }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditAddress;
