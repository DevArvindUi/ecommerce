import React from "react";
import BannerDefault from "./partials/Banner";
import AllCollection from "./partials/AllCollection";
import Trending from "../components/Trending";
import TwoColumn from "./partials/TwoColumn";
import GridLayout from "./partials/GridLayout";
import './default.css'

export default function defaultTheme() {
   return (
      <>
         <BannerDefault/>
         <AllCollection/>
         <Trending title="Trending"/>
         <TwoColumn/>
         <GridLayout/>
      </>
   )

      ;
}
