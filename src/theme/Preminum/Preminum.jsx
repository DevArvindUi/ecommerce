import React from 'react'
import ForItemsCard from './Partials/ForItemsCard';
import LatestNewsBlog from './Partials/LatestNewsBlog';
import Info from './Partials/Info';
import NewTrandingProduct from './Partials/NewTrandingProduct';
import ProductByCategories from './Partials/ProductByCategories';
import PremiumFooter from './Partials/PremiumFooter';
import "./premium.css";
import PremiumStyle from './Premium.style';

export default function Preminum() {
  return (
    <PremiumStyle>
      <ForItemsCard />
      <ProductByCategories />
      <NewTrandingProduct />
      <LatestNewsBlog />
      <Info />
      <PremiumFooter />
    </PremiumStyle>
  )
}
