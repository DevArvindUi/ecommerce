import React from "react";

const Copyright = (props) => {
   //get current year
   const date = new Date().getFullYear();
   return (
      <div className="container-fluid">
         <div className="row d-flex justify-content-center align-items-center copyright_container">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 order-2 order-sm-2 order-md-1">
               <p>
                  Copyright &copy; {date}&nbsp; Powered by{" "}
                  <a
                     className="text-decoration-none text-dark fw-bold"
                     href="https://shoppeez.com/"
                     target="_blank"
                     rel="noreferrer"
                    >
                     shoppeez.com
                  </a>
                  &nbsp; all rights reserved
               </p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end order-1 order-sm-1 order-md-2">
               {props.payment && (
                  <div className="d-flex">
                     {props.payment.map((item) => {
                        return (
                           <div className="mb-2 " key={`payment-list--key${item.id}`}>
                              <a href={item.path ? item.path : "/#"} target="_blank" rel="noreferrer">
                                 <img src={item.image} alt={item.name} height={item.height} width={item.width} />
                              </a>
                              <p></p>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Copyright;
