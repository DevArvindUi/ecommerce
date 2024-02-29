import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const OptionContext = createContext();

const OptionContextProvider = ({ children }) => {
  const [optiontypes, setoptiontypes] = useState([]);

  useEffect(() => {
    getoptionTypes();
  }, []);

  const getoptionTypes = async () => {
    const option_response = await axios.get(`${BASE_URL}/option_types`);
    const option_data = option_response.data.data;
    option_data.forEach((el) => {
      el["checked"] = false;
    });
    setoptiontypes(option_data);
  };

  return (
    <OptionContext.Provider value={{ optiontypes }}>
      {children}
    </OptionContext.Provider>
  );
};

export default OptionContextProvider;
