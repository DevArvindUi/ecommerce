import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const BrandContext = createContext();

const BrandContextProvider = ({ children }) => {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    getStoreSettings();
  }, []);

  const getStoreSettings = async () => {
    const brand_response = await axios.get(`${BASE_URL}/brands`);
    const brand_data = brand_response.data.data;
    brand_data.forEach((el) => {
      el["checked"] = false;
    });
    setBrand(brand_data);
  };

  return (
    <BrandContext.Provider value={{ brand }}>{children}</BrandContext.Provider>
  );
};

export default BrandContextProvider;
