"use client";

import { Toast } from "@/types/toast";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/reduxHooks";
import { removeToast } from "@/lib/features/toast/ToastSlice";

interface ToastProps {
  toast: Toast;
}

export const ToastComponent = ({ toast }: ToastProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [dispatch, toast.id, toast.duration]);

  return <div className="toast">{toast.message}</div>;
};
