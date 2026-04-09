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
import { savePlayerProgressLocalStorage } from "@/lib/persistence/localPersistence";
import { SavePlayerProgressInput } from "@/types/persistence";

export const SaveProgressButton = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const characterLocation = useAppSelector(selectCharacterLocation);
  const completedQuestIds = useAppSelector(selectCompletedQuestIds);
  const characterSnapshot = useAppSelector(selectCharacterSnapshot);

  const handleSaveProgress = async () => {
    console.log("Button clicked: Saving progress...");

    // Implement the logic to save the player's progress here
    if (!user || !activeCharacter || !characterLocation) {
      console.error("Missing required data to save progress.");
      return;
    } else {
      const playerSaveData: SavePlayerProgressInput = {
        playerId: user?.playerId,
        characterData: activeCharacter,
        progressionData: {
          completedQuestIds: completedQuestIds,
          currentTown: characterLocation,
        },
      };

      const response = await savePlayerProgressLocalStorage(playerSaveData);

      if (!response.success) {
        // once taost component is implemented, replace with toast error message
        console.error("Failed to save progress:", response.message);
      }

      // update snapshot of character state in redux store after successful save
      const characterSnapshot = {
        characterData: activeCharacter,
        progressionData: playerSaveData.progressionData,
      };

      dispatch(setCharacterSnapshot(characterSnapshot));

      // once taost component is implemented, replace with toast success message
      console.log("Progress saved successfully!");
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
