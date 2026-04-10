"use client";

import { useState } from "react";
import Image from "next/image";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { logout } from "@/lib/features/auth/AuthSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { useRouter } from "next/navigation";
import { clearSessionRefreshData } from "@/lib/persistence/localPersistence";
import { resetQuestState } from "@/lib/features/quest/QuestSlice";
import { resetCharacterState } from "@/lib/features/character/CharacterSlice";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    setIsLoading(true);

    clearSessionRefreshData();

    // reset all state to initial values
    dispatch(resetQuestState());
    dispatch(resetCharacterState());
    dispatch(logout());

    setIsLoading(false);

    console.log(
      "User logged out, session refresh data cleared, and state reset. Redirecting to splash screen...",
    );
    router.push("/");
  };

  return (
    <button
      className={`flex flex-row justify-center items-center hover:cursor-pointer `}
      onClick={handleLogout}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Image
          src={"/homescreen_icons/logout_image.png"}
          alt={"Logout Icon"}
          width={125}
          height={125}
          className="flex items-center justify-center"
        />
      )}
    </button>
  );
}
