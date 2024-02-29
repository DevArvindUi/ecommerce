import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const CategoriesContext = createContext();

const CategoriesContextProvider = ({ children }) => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      getCategoriesCall();
   }, []);

   const getCategoriesCall = async () => {
      const cat_response = await axios.get(`${BASE_URL}/categories/all_category`);
      const cat_data = cat_response.data.data;
      console.log(cat_data, "cat_data...");
      cat_data.forEach((el) => {
         el["checked"] = false;
      });
      setCategories(cat_data);
   };

   return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>;
};

export default CategoriesContextProvider;
