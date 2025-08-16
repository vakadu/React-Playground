"use client";

import Buttons from "./button";
import { ToastProvider } from "./context";
import Toaster from "./toaster";

export default function Toast() {
  return (
    <ToastProvider>
      <Buttons />
      <Toaster position="top-left" />
    </ToastProvider>
  );
}
