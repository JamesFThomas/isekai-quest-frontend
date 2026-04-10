"use client";

import { ReactNode, useEffect, useState } from "react";
import { loadSessionRefreshData } from "@/lib/persistence/localPersistence";
import { useAppDispatch } from "@/lib/reduxHooks";

import { login, User } from "@/lib/features/auth/AuthSlice";
import {
  setActiveCharacter,
  setCharacterLocation,
  setCharacterSnapshot,
} from "@/lib/features/character/CharacterSlice";
import { PersistenceResponse } from "@/types/persistence";

interface RefreshDataProviderProps {
  children: ReactNode;
}

export const RefreshDataProvider = ({ children }: RefreshDataProviderProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Checking for session refresh data in local storage...");

    setIsLoading(true);

    // Step 1: Load session refresh data from localStorage
    const refreshResponse: PersistenceResponse = loadSessionRefreshData();

    // Step 2: Stop if no valid refresh data exists
    if (!refreshResponse.success || !refreshResponse.data?.refreshSessionData) {
      console.log("No session refresh data found in local storage.");
      setIsLoading(false);

      return;
    }

    // Step 3: Extract the stored session refresh object
    const { refreshSessionData } = refreshResponse.data;
    const { accountId, email, playerId, characterSnapshot } =
      refreshSessionData;

    // Step 4: Extract character and progression data from the stored snapshot
    const { characterData, progressionData } = characterSnapshot;

    if (!characterData || !progressionData) {
      console.error("Session refresh data is missing required snapshot data.");
      setIsLoading(false);
      return;
    }

    console.log("Session refresh data found:", refreshSessionData);

    // Step 5: Rebuild minimal auth user for Redux rehydration
    const user: User = {
      accountId,
      playerId,
      email: email,
      characters: [characterData],
    };

    // Step 6: Restore auth state in Redux
    dispatch(login(user));

    // Step 7: Restore character state in Redux
    dispatch(setActiveCharacter(characterData));
    dispatch(setCharacterLocation(progressionData.currentTown));
    dispatch(setCharacterSnapshot(characterSnapshot));
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
