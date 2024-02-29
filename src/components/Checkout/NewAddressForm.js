import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

export const NewAddressForm = (props) => {
  const navigate = useNavigate();
  const {
    handleadd,
    addressinput,
    formerror,
    perror,
    handleaccSubmit,
    setSelectedState,
    setSelectedCity,
    selectedCity,
    selectedState,
    setformerror,
    validate,
  } = props;
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const isInputPreviouslyBlurred = React.useRef(false);

  const goBackToLogin = () => {
    if (props.setGuestLogin !== undefined && props.setscreen !== undefined) {
      const { setGuestLogin, setscreen } = props;
      setGuestLogin(false);
      setscreen("login");
    }
    localStorage.setItem("isGuest", "false");
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

  return (
    <>
      <div className="check_form">
        <form autoComplete="off">
          {addressinput.email !== undefined && (
            <div className="form-group">
              <label>Email *</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={(e) => handleadd(e)}
                value={addressinput.email || ""}
              />
              <span className="text-danger">{formerror.email}</span>
            </div>
          )}

          <div className="form-group d-flex justify-content-between mt-3">
            <div style={{ width: "48%" }}>
              <label>Full Name *</label>
              <input
                className="form-control"
                type="text"
                name="full_name"
                onChange={(e) => handleadd(e)}
                value={addressinput.full_name || ""}
              />
              <span className="text-danger">{formerror.full_name}</span>
            </div>
            <div style={{ width: "48%" }}>
              <label>Phone/Mobile *</label>
              <input
                className="form-control"
                type="tel"
                name="mobile_number"
                onChange={(e) => handleadd(e)}
                value={addressinput.mobile_number || ""}
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
                onChange={(e) => handleadd(e)}
                value={addressinput.address_line_1 || ""}
              />
              <span className="text-danger">{formerror.address_line_1}</span>
            </div>

            <div style={{ width: "48%" }}>
              <label>Address Line 2</label>
              <textarea
                name="address_line_2"
                rows="2"
                cols="30"
                className="form-control"
                onChange={(e) => handleadd(e)}
                value={addressinput.address_line_2 || ""}
              />
            </div>
          </div>

          <div className="form-group d-flex justify-content-between mt-3  ">
            <div style={{ width: "48%" }}>
              <label>State *</label>
              {/* <input
                className="form-control"
                type="text"
                name="state"
                onChange={(e) => handleadd(e)}
                value={addressinput.state || ""}
                disabled={true}
              /> */}
              <Select
                isClearable={true}
                options={stateData.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
                value={selectedState}
                name="state"
                onChange={handleStateChange}
              />
              <span className="text-danger">{formerror.state}</span>
            </div>

            <div style={{ width: "48%" }}>
              <label>City *</label>
              <CreatableSelect
                isClearable={true}
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
              <span className="text-danger">{formerror.city}</span>
            </div>
          </div>

          <div className="form-group d-flex justify-content-between mt-3  ">
            <div style={{ width: "48%" }}>
              <label>Pincode *</label>
              <input
                className="form-control"
                type="number"
                name="pincode"
                onChange={(e) => handleadd(e)}
                value={addressinput.pincode || ""}
              />
              {perror ? <span className="error-display">{perror}</span> : null}
              <span className="text-danger">{formerror.pincode}</span>
            </div>
            <div style={{ width: "48%" }}>
              <label>Country *</label>
              <input
                className="form-control"
                type="text"
                name="country"
                onChange={(e) => handleadd(e)}
                value={addressinput.country || ""}
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
              onChange={(e) => handleadd(e)}
              value={addressinput.landmark || ""}
            />
          </div>
          {props.isGuest !== undefined ? (
            <div className="form-group my-4 d-flex justify-content-between">
              <p>
                Already have an account?
                <span onClick={goBackToLogin} className="theme_link_color cursor_class mx-1">
                  Login
                </span>
              </p>
              <button
                onClick={props.handleGuestCheckout}
                className="theme_button"
                type="submit"
                style={{
                  padding: "7px 20px",
                  borderRadius: "10px",
                }}
              >
                Proceed
              </button>
            </div>
          ) : (
            <div className="form-group mt-3">
              <button
                onClick={handleaccSubmit}
                className="theme_button"
                type="submit"
                style={{
                  padding: "7px 20px",
                  borderRadius: "10px",
                }}
              >
                Save Address
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
