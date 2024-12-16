import { useToast } from "./context";

export default function Toaster({ position }) {
  const { toasts, removeToast } = useToast();

  const getBg = (type) => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "white";
    }
  };

  const getPosition = () => {
    switch (position) {
      case "bottom-right":
        return {
          bottom: 12,
          right: 12,
        };
      case "top-left":
        return {
          top: 12,
          left: 12,
        };
      default:
        return {
          top: 12,
          right: 12,
        };
    }
  };
  const toastPosition = getPosition();

  return (
    <div style={{ ...toastPosition, position: "absolute" }}>
      {toasts.map((toast) => {
        const bg = getBg(toast.type);
        return (
          <div
            style={{
              backgroundColor: bg,
              color: "white",
            }}
            key={toast.id}
          >
            <div>{toast.msg}</div>
            <span onClick={() => removeToast(toast.id)}>X</span>
          </div>
        );
      })}
    </div>
  );
}
