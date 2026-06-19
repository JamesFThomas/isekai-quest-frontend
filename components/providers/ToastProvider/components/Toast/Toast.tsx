"use client";

import { Toast } from "@/types/toast";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/reduxHooks";
import { removeToast, shiftToastGroup } from "@/lib/features/toast/ToastSlice";

interface ToastProps {
  toast: Toast;
  isLast: boolean;
}

export const ToastComponent = ({ toast, isLast }: ToastProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
      if (isLast) dispatch(shiftToastGroup());
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [dispatch, toast.id, toast.duration, isLast]);

  return <div className="toast">{toast.message}</div>;
};
