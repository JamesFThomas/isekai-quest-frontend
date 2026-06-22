"use client";

import { useAppSelector } from "@/lib/reduxHooks";
import { selectToastQueue } from "@/lib/features/toast/ToastSlice";
import { ToastComponent } from "../Toast/Toast";

export const ToastContainer = () => {
  const toastQueue = useAppSelector(selectToastQueue);

  if (!toastQueue.length || !toastQueue[0].length) return null;

  const currentGroup = toastQueue[0];

  return (
    <div
      id="toast-container"
      className="fixed top-20 right-0 z-50 flex flex-col gap-2"
    >
      {currentGroup.map((toast, index) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          isLast={index === currentGroup.length - 1}
        />
      ))}
    </div>
  );
};
