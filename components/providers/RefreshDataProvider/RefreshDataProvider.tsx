"use client";

import { ReactNode, useEffect, useState } from "react";
import { loadSessionRefreshData } from "@/lib/persistence/localPersistence";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

import { login, User } from "@/lib/features/auth/AuthSlice";

import {
  setActiveCharacter,
  setCharacterLocation,
  setCharacterSnapshot,
} from "@/lib/features/character/CharacterSlice";

import {
  selectAvailableQuests,
  setAcceptedQuestById,
  setCurrentStoryPointId,
  setLastEndedQuestId,
} from "@/lib/features/quest/QuestSlice";

import { PersistenceResponse } from "@/types/persistence";

interface RefreshDataProviderProps {
  children: ReactNode;
}

export const RefreshDataProvider = ({ children }: RefreshDataProviderProps) => {
  const dispatch = useAppDispatch();
  const availableQuests = useAppSelector(selectAvailableQuests);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (availableQuests.length === 0) return; // wait for game data to load

    setIsLoading(true);

    // Step 1: Load session refresh data from localStorage
    const refreshResponse: PersistenceResponse = loadSessionRefreshData();

    // Step 2: Stop if no valid refresh data exists
    if (!refreshResponse.success || !refreshResponse.data?.refreshSessionData) {
      setIsLoading(false);

      return;
    }

    // Step 3: Extract the stored session refresh object
    const { refreshSessionData } = refreshResponse.data;
    const { accountId, email, playerId, characterSnapshot } =
      refreshSessionData;

    // Step 4: Extract character and progression data from the stored snapshot
    const { characterData, progressionData } = characterSnapshot;

    if (
      !characterData ||
      !progressionData ||
      !accountId ||
      !email ||
      !playerId
    ) {
      console.error("Session refresh data is missing required fields.");
      setIsLoading(false);
      return;
    }

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

    // Step 8: Restore quest state in Redux
    //
    // Quest state is read from the character snapshot, not from the
    // duplicate fields on the session refresh object itself. The snapshot's
    // progressionData is the same payload written to the character save, so
    // it is the authoritative record of where the player left off. The top
    // level fields are written by three separate components and only have to
    // disagree once to silently drop an accepted quest on refresh, which is
    // exactly what happened when LoginModal wrote a hardcoded null there.
    if (progressionData.acceptedQuestId) {
      dispatch(setAcceptedQuestById(progressionData.acceptedQuestId));
      dispatch(setCurrentStoryPointId(progressionData.currentStoryPointId));
    }

    if (progressionData.lastEndedQuestId) {
      dispatch(setLastEndedQuestId(progressionData.lastEndedQuestId));
    }

    setIsLoading(false);
  }, [dispatch, availableQuests]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
