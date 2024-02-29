import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const BannerContext = createContext();

const BannerContextProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    const data = await axios.get(`${BASE_URL}/banners`);
    const res = data.data.data;
    setBanner(res);
  };

  return (
    <BannerContext.Provider value={{ banner }}>
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContextProvider;
