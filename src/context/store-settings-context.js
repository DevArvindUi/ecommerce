import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [storeSettings, setstoreSettings] = useState([]);

  //to change application title from api
  useEffect(() => {
    getStoreSettings();
  }, []);

  const getStoreSettings = async () => {
    const store_response = await axios.get(`${BASE_URL}/store_settings`);
    const store_data = store_response.data.data;
    setstoreSettings(store_data);
    console.log(store_data,'store_data');
    const root = document.documentElement;
    root.style.setProperty(
      "--color-BackgroundColor",
      store_data.background_color
    );
    root.style.setProperty(
      "--color-BorderColor", 
      store_data.border_color
    );
    root.style.setProperty(
      "--color-FontColor", 
      store_data.text_color
    );
    root.style.setProperty(
      "--color-HoverColor",
      store_data.hover_color
    );

    document.title = store_data.name;
  };

  return (
    <StoreContext.Provider value={{ storeSettings }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
