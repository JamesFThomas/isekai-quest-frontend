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
      className="toast-slide-in min-w-[200px] bg-[url('/background_images/parchment_paper.png')] bg-cover bg-no-repeat bg-center text-[#2c1a0e] font-bold text-sm px-4 py-3 rounded-l-lg shadow-lg"
    >
      {toast.message}
    </div>
  );
};
