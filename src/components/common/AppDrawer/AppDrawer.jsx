import React from "react";
import { forwardRef, useState, useImperativeHandle } from "react";
import { Offcanvas } from "react-bootstrap";

// for use AppDrawer -> ref = useRef() in AppDrawer props
const AppDrawer = ({ fragment, children }, ref) => {
   const [open, setOpen] = useState(false);
   const handleClose = () => setOpen(false);
   useImperativeHandle(ref, () => ({
      setOpen,
   }));
   return fragment ? (
      <>{children}</>
   ) : (
      <Offcanvas show={open} onHide={handleClose} style={{ width: "300px" }}>
         <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
   );
};
export default forwardRef(AppDrawer);
