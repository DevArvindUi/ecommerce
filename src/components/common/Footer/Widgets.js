import React from "react";
import { Link } from "react-router-dom";

const Widgets = ({ widgets }) => {
   return (
      <div className="container-fluid">
         <div className="row mb-4 mt-5 justify-content-center footer_widgets_div">
            {widgets.map((val) => (
               <div key={val?.id} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2">
                  <h4 className="my-3" style={{fontSize:"18px"}}>{val?.widgetTitle}</h4>
                  <div>
                     {val?.lists?.map((list) => (
                        <p
                           key={`widget-list--key${list.id}`}
                           style={{
                              fontSize: "14px",
                           }}>
                           {val?.widgetTitle === "Follow us on" && list?.slug && (
                              <>
                                 {list?.icon && (
                                    <span className="" style={{ marginRight: "7px" }}>
                                       {list?.icon}
                                    </span>
                                 )}
                                 <a href={list?.slug ? list.slug : "#"} target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">
                                    {list?.title}
                                 </a>
                              </>
                           )}

                           {val?.widgetTitle === "Help" && (
                              <>
                                 <Link className="text-capitalize text-decoration-none text-secondary" to={list?.slug ? list.slug : "#"}>
                                    {list?.title}
                                 </Link>
                              </>
                           )}

                           {val?.widgetTitle === "Informations" && (
                              <Link className="text-capitalize text-decoration-none text-secondary" to={list?.slug ? `/get-to-know-us/${list.slug}` : "#"}>
                                 {list?.title}
                              </Link>
                           )}

                           {val?.widgetTitle === "Quick Links" && (
                              <Link className="text-capitalize text-decoration-none text-secondary" to={list?.slug ? `${list.slug}` : "#"}>
                                 {list?.title}
                              </Link>
                           )}

                           {val?.widgetTitle === "Top Categories" && (
                              <>
                                 <Link to={list?.id ? `/search?category_ids[]=${list.id}` : "#"} className="text-capitalize text-decoration-none text-secondary">
                                    {list?.name}
                                 </Link>
                              </>
                           )}
                        </p>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Widgets;
