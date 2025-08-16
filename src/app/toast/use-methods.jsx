import { useToast } from "./context";

export default function useToastMethods() {
  const { addToast } = useToast();
  const success = (msg) => {
    return addToast(msg, "success");
  };

  return {
    success,
  };
}
