import React from "react";
import { Dropdown } from "react-bootstrap";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BiSort } from "react-icons/bi";

function Sorting({ dropdownmenu, sortAscDsc }) {
  return (
    <div className="sorting_dropdown">
      <Dropdown className="show_drop">
        <Dropdown.Toggle
          id="dropdown-basic"
          variant="secondary"
          className="d-flex"
        >
          <div className="dropdown_menu_div">
            <BiSort style={{ marginRight: "5px" }} />
            {dropdownmenu}
          </div>
          <div className="drop_arrow" style={{ height: "21px" }}>
            <IoIosArrowUp size={15} />
            <IoIosArrowDown size={15} />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => sortAscDsc("asc")} className="activeColor">Price: low to high</Dropdown.Item>
          <Dropdown.Item onClick={() => sortAscDsc("desc")} className="activeColor">Price: high to low</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Sorting;
