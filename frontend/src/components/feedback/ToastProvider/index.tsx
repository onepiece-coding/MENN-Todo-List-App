"use client";

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default ToastProvider;
