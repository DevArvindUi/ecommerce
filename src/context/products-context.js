import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";
import axios from "axios";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productMeta, setProductMeta] = useState({});

  useEffect(() => {
    getProductsCall();
  }, []);

  const getProductsCall = async () => {
    const prod_response = await axios.get(`${BASE_URL}/products/filter`);
    setProducts(prod_response.data.data);
    setProductMeta(prod_response.data.meta);
  };

  return (
    <ProductsContext.Provider value={{ products, productMeta }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
