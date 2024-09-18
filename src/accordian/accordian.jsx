import React from "react";
import { useState } from "react";
import {
  AccordianContext,
  AccordianItemContext,
  useAccordian,
  useAccordianItem,
} from "./context";

const Accordian = ({ children }) => {
  const [show, setShow] = useState(null);
  const value = {
    show,
    setShow,
  };

  return (
    <AccordianContext.Provider value={value}>
      {children}
      {/* {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          show,
          setShow,
        });
      })} */}
    </AccordianContext.Provider>
  );
};

export const AccordianItem = ({ children, id }) => {
  const value = {
    id,
  };
  return (
    <AccordianItemContext.Provider value={value}>
      <div>{children}</div>
      {/* {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          show,
          setShow,
          id,
        });
      })} */}
    </AccordianItemContext.Provider>
  );
};

export const AccordianHeader = ({ title }) => {
  const { setShow } = useAccordian();
  const { id } = useAccordianItem();

  return <button onClick={() => setShow(id)}>{title}</button>;
};

export const AccordianPanel = ({ children }) => {
  const { show } = useAccordian();
  const { id } = useAccordianItem();
  if (show === id) {
    return <p>{children}</p>;
  }
};

export default Accordian;
