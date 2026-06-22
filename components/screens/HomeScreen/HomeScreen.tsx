"use client";

import { useState } from "react";

import InteractionPanel, {
  PanelOption,
} from "@/components/ui/InteractionPanel/InteractionPanel";

import startsVilleOptions from "@/data/screenOptions/startsVilleOptions";

import useProtectedRoute from "@/lib/hooks/useProtectedRoute";
import { ControlPanel } from "@/components/ui/ControlPanel/ContolPanel";

// remove after testing
import { useAppDispatch } from "@/lib/reduxHooks";
import { addToast } from "@/lib/features/toast/ToastSlice";
// remove after testing

export default function HomeScreen() {
  useProtectedRoute();

  const [startsVilleArray] = useState<PanelOption[]>(startsVilleOptions);

  // remove after testing
  // inside the component
  const dispatch = useAppDispatch();

  const testToast = () => {
    dispatch(
      addToast([
        {
          id: "test-1",
          characterName: "James",
          message: "Toast system is working!",
          type: "quest",
          duration: 3000,
          timestamp: Date.now(),
        },
      ]),
    );
  };
  // remove after testing

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/table_background.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel pageKey="home" />
      <div
        className="home-screen-container flex flex-col justify-center items-center gap-4"
        style={{
          flexGrow: 1,
        }}
      >
        {/* remove after testing */}
        <button onClick={testToast} className="text-white border p-2 rounded">
          Test Toast
        </button>
        {/* remove after testing */}
        <InteractionPanel title="StartsVille" optionArray={startsVilleArray} />
      </div>
    </div>
  );
}
