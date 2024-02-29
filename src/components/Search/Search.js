import React from "react";
//react icons import
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ searchToggle }) => {
  return (
    <React.Fragment>
      <AiOutlineSearch
        size={25}
        onClick={searchToggle}
        className="cursor_class"
      />
    </React.Fragment>
  );
};
export default Search;
