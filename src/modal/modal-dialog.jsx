import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function useOnKeyDown(key, onClose) {
  useEffect(() => {
    function onKeydown(e) {
      if (e.key === key) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, [key, onClose]);
}

function useOnClickOutside(ref, onClose) {
  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current !== null && !ref.current?.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    //touchstart is for mobile and tablet devices
    // document.addEventListener("touchstart", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      // document.removeEventListener("touchstart", onClickOutside);
    };
  }, [onClose, ref]);
}

export default function ModalDialog({ show, title, onClose, children }) {
  const ref = useRef();

  useOnKeyDown("Escape", onClose);
  useOnClickOutside(ref, onClose);

  if (!show) {
    return null;
  }
  //inset is shorthand for top, left, right, bottom
  return createPortal(
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        inset: 0,
      }}
      // onClick={onClose}
    >
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
        // onClick={(e) => e.stopPropagation()}
      >
        <div>{title}</div>
        {children}
        <button onClick={onClose}>close</button>
      </div>
    </div>,
    document.body
  );
}
