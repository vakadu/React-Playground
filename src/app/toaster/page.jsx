"use client";

import Child from "./child";
import { ToastProvider } from "./context";
import { Toast } from "./toast";
import Ui from "./ui";

export default function Toaster() {
  const toast = new Toast();
  return (
    <ToastProvider value={toast}>
      <Child />
      <Ui />
    </ToastProvider>
  );
}
