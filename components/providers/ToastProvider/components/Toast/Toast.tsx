"use client";

import { Toast } from "@/types/toast";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { removeToast, shiftToastGroup } from "@/lib/features/toast/ToastSlice";

import { selectActiveCharacter } from "@/lib/features/character/CharacterSlice";

interface ToastProps {
  toast: Toast;
  isLast: boolean;
}

export const ToastComponent = ({ toast, isLast }: ToastProps) => {
  const dispatch = useAppDispatch();
  const activeCharacter = useAppSelector(selectActiveCharacter);

  const isPlayerToast = toast.characterName === activeCharacter?.name;
  const slideClass = isPlayerToast
    ? "toast-slide-in-right"
    : "toast-slide-in-left";

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
      className={`${slideClass} min-w-[200px] bg-[url('/background_images/parchment_paper.png')] bg-cover bg-no-repeat bg-center text-[#2c1a0e] font-bold text-sm px-4 py-3 rounded-l-lg shadow-lg`}
    >
      {toast.message}
    </div>
  );
};
