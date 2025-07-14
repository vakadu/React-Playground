import { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = document.getElementById("portal-root");
  return reactDom.createPortal(children, portalRoot);
};

function useClickOutsideHook(ref, cb) {
  useEffect(() => {
    function handleOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [ref, cb]);
}

export default function UseClickOutside() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  function handleClose() {
    setOpen(false);
  }

  useClickOutsideHook(ref, handleClose);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open</button>
      {open && (
        <Portal>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div ref={ref} style={{ backgroundColor: "white" }}>
              hello
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
