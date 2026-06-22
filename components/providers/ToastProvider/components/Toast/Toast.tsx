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

  return (
    <div
      id={toast.id}
      className="toast-slide-in bg-gray-800 text-white px-4 py-2 rounded-l-lg shadow-lg"
    >
      {toast.message}
    </div>
  );
};
