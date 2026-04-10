import { selectUser } from "@/lib/features/auth/AuthSlice";
import {
  selectActiveCharacter,
  selectCharacterLocation,
  selectCompletedQuestIds,
  setCharacterSnapshot,
  selectCharacterSnapshot,
} from "@/lib/features/character/CharacterSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useDispatch } from "react-redux";
import {
  savePlayerProgressLocalStorage,
  saveSessionRefreshData,
} from "@/lib/persistence/localPersistence";
import {
  SavePlayerProgressInput,
  SessionRefreshData,
} from "@/types/persistence";
import { selectQuestState } from "@/lib/features/quest/QuestSlice";

export const SaveProgressButton = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const characterLocation = useAppSelector(selectCharacterLocation);
  const completedQuestIds = useAppSelector(selectCompletedQuestIds);
  const characterSnapshot = useAppSelector(selectCharacterSnapshot);
  const questState = useAppSelector(selectQuestState);

  const handleSaveProgress = async () => {
    console.log("Button clicked: Saving progress...");

    try {
      // Step 1: Validate required data exists before attempting save
      if (
        !user ||
        !activeCharacter ||
        !characterLocation ||
        !characterSnapshot ||
        !questState
      ) {
        console.error("Missing required data to save progress.");
        return;
      }

      // Step 2: Extract current quest state from Redux
      const { acceptedQuest, currentStoryPointId, lastEndedQuestId } =
        questState;

      // Step 3: Build player save payload from current Redux state
      const playerSaveData: SavePlayerProgressInput = {
        playerId: user.playerId,
        characterData: activeCharacter,
        progressionData: {
          completedQuestIds: completedQuestIds,
          currentTown: characterLocation,
          acceptedQuestId: acceptedQuest?.id ?? null,
          currentStoryPointId: currentStoryPointId ?? null,
          lastEndedQuestId: lastEndedQuestId ?? null,
        },
      };

      // Step 4: Persist player progress to localStorage
      const response = await savePlayerProgressLocalStorage(playerSaveData);

      // Step 5: Stop execution if main save fails
      if (!response.success) {
        console.error("Failed to save progress:", response.message);
        return;
      }

      // Step 6: Build updated snapshot based on saved progression data
      const updatedCharacterSnapshot = {
        characterData: activeCharacter,
        progressionData: playerSaveData.progressionData,
      };

      // Step 7: Create session refresh object for rehydration on app reload
      const sessionRefreshData: SessionRefreshData = {
        accountId: user.accountId,
        playerId: user.playerId,
        characterSnapshot: updatedCharacterSnapshot,
      };

      // Step 8: Persist session refresh data to localStorage
      const refreshData = await saveSessionRefreshData(sessionRefreshData);

      // Step 9: Log error if refresh persistence fails (non-blocking)
      if (!refreshData.success) {
        console.error(
          "Failed to save session refresh data:",
          refreshData.message,
        );
      }

      // Step 10: Confirm refresh data save
      console.log("Session refresh data saved successfully.");

      // Step 11: Update Redux snapshot to reflect latest saved state
      dispatch(setCharacterSnapshot(updatedCharacterSnapshot));

      // Step 12: Confirm successful save
      console.log("Progress saved successfully!");
    } catch (error) {
      // Step 13: Catch unexpected errors during save flow
      console.error("Unexpected error during save progress:", error);
    }
  };

  const isStateDirty = () => {
    // implement logic to determine if character state has changed since last save
    if (!activeCharacter || !characterLocation || !characterSnapshot) {
      return false;
    }

    const currentState = {
      characterData: activeCharacter,
      progressionData: {
        completedQuestIds: completedQuestIds,
        currentTown: characterLocation,
        acceptedQuestId: questState.acceptedQuest?.id ?? null,
        currentStoryPointId: questState.currentStoryPointId ?? null,
        lastEndedQuestId: questState.lastEndedQuestId ?? null,
      },
    };

    return JSON.stringify(characterSnapshot) !== JSON.stringify(currentState);
  };

  return (
    <div className="mt-4 w-full flex justify-end">
      <button
        className="
        px-4 py-2
        text-sm font-semibold text-white
        border-2 border-white
        rounded-lg
        transition-all duration-200
        hover:bg-white/10
        hover:cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-white/50
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
        onClick={handleSaveProgress}
        disabled={!isStateDirty()}
      >
        Save Progress
      </button>
    </div>
  );
};
