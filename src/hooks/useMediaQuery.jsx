import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      const updateMatches = (e) => setMatches(e.matches);

      // Set initial value based on the current media query state
      setMatches(mediaQuery.matches);

      // Add a listener to update the state when the media query matches change
      mediaQuery.addListener(updateMatches);

      // Clean up the listener when the component unmounts
      return () => mediaQuery.removeListener(updateMatches);
   }, [query]);

   return matches;
};

export default useMediaQuery;
