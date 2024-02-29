import React from "react";
import { FiFilter } from "react-icons/fi";

function Filtering({
  categories,
  brand,
  optiontypes,
  oninputChange,
  clearFilter,
}) {
 
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          Filters <FiFilter />
        </h3>
        <p className="cursor_class" onClick={clearFilter}>
          Clear All
        </p>
      </div>
      <hr />
      <div className="cat_filter">
        <h6 className="mb-4 mt-4">Category</h6>
        <form>
          {categories.map((value) => (
            <div className="form-check" key={value.id}>
              <input
                type="checkbox"
                className="form-check-input"
                id={value.id}
                name="category"
                value={value.name}
                onChange={(e) => oninputChange(e.target, value.id)}
                checked={value?.checked}
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor={value.name}
              >
                {value.name}
              </label>
            </div>
          ))}
        </form>
      </div>
      <hr />

      <div className="brand_filter">
        <h6 className="mb-4 mt-4">Brands</h6>
        <form>
          {brand.map((value) => (
            <div className="form-check" key={value.id}>
              <input
                type="checkbox"
                className="form-check-input"
                id={value.id}
                name="brand"
                value={value.name}
                onChange={(e) => oninputChange(e.target, value.id)}
                checked={value.checked}
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor={value.name}
              >
                {value.name}
              </label>
            </div>
          ))}
        </form>
      </div>
      <hr />

      <div className="option_filter">
        {optiontypes.map((option) => (
          <div key={option.id}>
            <h6 className="mb-4 mt-4">{option.name}</h6>
            {option.option_values.map((value) => {
              return option.name.toLowerCase() === "color" ? (
                <div className="form-check d-flex" key={value.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={value.id}
                    name="option1"
                    value={value.name}
                    onChange={(e) => oninputChange(e.target, value.id)}
                    checked={value.checked}
                  />
                  <div
                    className="color_show"
                    style={{
                      backgroundColor: `${value.display}`,
                      marginLeft: "12px",
                    }}
                  ></div>
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={value.name}
                  >
                    {value.name}
                  </label>
                </div>
              ) : (
                <div className="form-check" key={value.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={value.id}
                    name="option1"
                    value={value.name}
                    onChange={(e) => oninputChange(e.target, value.id)}
                    checked={value.checked}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={value.name}
                  >
                    {value.name}
                  </label>
                </div>
              );
            })}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default Filtering;
