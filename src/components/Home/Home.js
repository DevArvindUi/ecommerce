import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store-settings-context";
const Home = ({ setIsWishlisted, setGuestLogin }) => {
   const [DynamicComponent, setDynamicComponent] = useState(null);
   const { storeSettings } = useContext(StoreContext);
   const importComponent = async () => {
      try {
         const componentName = "Preminum" || storeSettings?.theme_template?.name;
         console.log({componentName});
         const module = await import(`../../theme/${componentName}/${componentName}`);
         const ImportedComponent = module.default;
         setDynamicComponent(() => <ImportedComponent setIsWishlisted={setIsWishlisted} setGuestLogin={setGuestLogin} />); // Render the component directly
      } catch (error) {
         console.error("Error importing component:", error);
      }
   };

   useEffect(() => {
      importComponent();
   }, []);
   return <React.Fragment>{DynamicComponent}</React.Fragment>;
};
export default Home;
