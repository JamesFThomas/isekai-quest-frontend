"use client";

import { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return <>{children}</>;
};
