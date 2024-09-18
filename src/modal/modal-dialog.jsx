import { createPortal } from "react-dom";

export default function ModalDialog({ show, title, onClose, children }) {
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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{title}</div>
        {children}
        <button onClick={onClose}>close</button>
      </div>
    </div>,
    document.body
  );
}
