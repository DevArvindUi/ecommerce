import React from "react";
import { Modal, Tab, Row, Col, Nav } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

export const FilterModel = (props) => {
  const {
    setfilterModel,
    filterModel,
    filterToggle,
    categories,
    brand,
    optiontypes,
    oninputChange,
    clearFilter,
  } = props;
  return (
    <>
      <div onClick={filterToggle}>
        <FiFilter style={{ marginRight: "5px" }} />
        Filter
      </div>
      <Modal
        show={filterModel}
        onHide={() => {
          setfilterModel(false);
        }}
        className="filter_dialog"
      >
        <div
          className="close-icon"
          onClick={() => {
            setfilterModel(false);
          }}
        >
          <MdOutlineClose />
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3>
              Filters <FiFilter />
            </h3>
            <p className="cursor_class" onClick={clearFilter}>
              Clear All
            </p>
          </div>
          <hr />
          <Tab.Container id="left-tabs-example" defaultActiveKey="category">
            <Row className="filter_left_row">
              <Col>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="category">Category</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="brand">Brands</Nav.Link>
                  </Nav.Item>
                  {optiontypes.map((option) => (
                    <Nav.Item key={option.id}>
                      <Nav.Link eventKey={option.name}>{option.name}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="category">
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="brand">
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
                  </Tab.Pane>
                  {optiontypes.map((option, index) => (
                    <Tab.Pane eventKey={option.name} key={index}>
                      {option.option_values.map((value) => {
                        return option.name === "color" ? (
                          <div className="form-check d-flex" key={value.id}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={value.id}
                              name="option1"
                              value={value.name}
                              onChange={(e) =>
                                oninputChange(e.target, value.id)
                              }
                              checked={value.checked}
                            />
                            <div
                              className="color_show"
                              style={{
                                backgroundColor: `${value.display}`,
                                margin: "0px 10px",
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
                              onChange={(e) =>
                                oninputChange(e.target, value.id)
                              }
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
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          <div className="option_filter"></div>
        </Modal.Body>
      </Modal>
    </>
  );
};
