"use client";

import { useAppSelector } from "@/lib/reduxHooks";
import { selectToastQueue } from "@/lib/features/toast/ToastSlice";
import { ToastComponent } from "../Toast/Toast";
import { selectActiveCharacter } from "@/lib/features/character/CharacterSlice";

export const ToastContainer = () => {
  const toastQueue = useAppSelector(selectToastQueue);
  const activeCharacter = useAppSelector(selectActiveCharacter);

  if (!toastQueue.length || !toastQueue[0].length) return null;

  const currentGroup = toastQueue[0];

  const playerToasts = currentGroup.filter(
    (toast) => toast.characterName === activeCharacter?.name,
  );

  const opponentToasts = currentGroup.filter(
    (toast) => toast.characterName !== activeCharacter?.name,
  );

  return (
    <>
      <div className="fixed top-20 right-0 z-50 flex flex-col gap-2">
        {playerToasts.map((toast, index) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            isLast={index === currentGroup.length - 1}
          />
        ))}
      </div>
      <div className="fixed top-20 left-0 z-50 flex flex-col gap-2">
        {opponentToasts.map((toast, index) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            isLast={index === currentGroup.length - 1}
          />
        ))}
      </div>
    </>
  );
};
