"use client";

import { useAppSelector } from "@/lib/reduxHooks";
import { selectToastQueue } from "@/lib/features/toast/ToastSlice";
import { Toast } from "@/types/toast";

export const ToastContainer = () => {
  const toastQueue = useAppSelector(selectToastQueue);

  if (!toastQueue.length || !toastQueue[0].length) return null;

  const currentGroup = toastQueue[0];

  return (
    <div className="toast-container">
      {currentGroup.map((toast) => (
        <div key={toast.id}>{toast.message}</div>
      ))}
    </div>
  );
};
