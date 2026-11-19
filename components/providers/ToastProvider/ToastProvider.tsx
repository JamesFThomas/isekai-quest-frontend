"use client";

import { ReactNode, useEffect } from "react";

import { primeAudioContext } from "@/lib/utils/soundEffects";

interface ToastProviderProps {
  children: ReactNode;
}

// Gestures that browsers accept as user activation for audio playback.
const AUDIO_UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  // Create the shared AudioContext on the player's first interaction with the
  // page, rather than leaving it to whichever toast happens to render first.
  // Toast sounds play from a React effect, which the browser does not treat
  // as a user gesture, so a context created there can be born suspended and
  // stay that way for the life of the page.
  useEffect(() => {
    const unlockAudio = () => {
      primeAudioContext();
      removeListeners();
    };

    const removeListeners = () => {
      AUDIO_UNLOCK_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, unlockAudio),
      );
    };

    AUDIO_UNLOCK_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, unlockAudio, { passive: true }),
    );

    return removeListeners;
  }, []);

  return <>{children}</>;
};
