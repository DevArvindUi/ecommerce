import React, { useContext } from "react";

const TwoColumn = () => {

   return (
      <>
         <div className="container-fluid position-relative section-gap main">
            <div className="row">
               <div className="col-md-6 mb-3">
                  <div className="twoColumnFlex position-relative twoColumnLeft">
                     <div className="twoColumntext">
                        <p className="smallText font-SourceSerifPro-Regular">50% off</p>
                        <p className="futuraMd font36 textUpper">new collection</p>
                        <button className="btn btn-outline-dark px-4 text-uppercase btnCommonSmall rounded-0 d-block w-auto py-2 px-4">
                           shop Now
                        </button>
                     </div>
                     <div className="d-flex justify-content-end">
                        <img className="twoColumnImg" src="/images/imageDummy1.png" alt="" />
                     </div>
                  </div>
               </div>
               <div className="col-md-6 mb-3">
                  <div className="twoColumnFlex twoColumnRight position-relative">
                     <div className="twoColumntext">
                        <p className="smallText font-SourceSerifPro-Regular">winter offer</p>
                        <p className="futuraMd font36 textUpper">new collection</p>
                        <button className="btn btn-outline-dark px-4 text-uppercase btnCommonSmall rounded-0 d-block w-auto py-2 px-4">
                           shop now
                        </button>
                     </div>
                     <div className="d-flex justify-content-end">
                        <img className="twoColumnImg" src="/images/imageDummy2.png" alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default TwoColumn;
