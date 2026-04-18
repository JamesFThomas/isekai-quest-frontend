import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { BattleDetails, QuestStory, QuestStoryId, StoryPointId } from "@/types/quest";

interface QuestState {
  acceptedQuest: QuestStory | null;
  currentStoryPointId: StoryPointId | null;
  lastEndedQuestId: QuestStoryId | null;
  pendingBattleDetails: BattleDetails | null;
}

export const initialState: QuestState = {
  acceptedQuest: null,
  currentStoryPointId: null,
  lastEndedQuestId: null,
  pendingBattleDetails: null,
};

export const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    setAcceptedQuest: (state, action: PayloadAction<QuestStory | null>) => {
      state.acceptedQuest = action.payload;
      state.lastEndedQuestId = null;
      if (action.payload && state.acceptedQuest) {
        state.currentStoryPointId = action.payload.storyPoints[0].id;
      }
    },
    setCurrentStoryPointId: (
      state,
      action: PayloadAction<StoryPointId | null>,
    ) => {
      state.currentStoryPointId = action.payload;
    },
    resetFailedQuestToFirstPoint: (state) => {
      if (state.acceptedQuest) {
        state.currentStoryPointId = state.acceptedQuest.storyPoints[0].id;
        state.pendingBattleDetails = null;
      }
    },
    markQuestCompletedAndClearState: (state) => {
      state.lastEndedQuestId = state.acceptedQuest?.id ?? null;
      state.acceptedQuest = null;
      state.currentStoryPointId = null;
      state.pendingBattleDetails = null;
    },
    markQuestFailedAndClearState: (state) => {
      state.lastEndedQuestId = state.acceptedQuest?.id ?? null;
      state.acceptedQuest = null;
      state.currentStoryPointId = null;
      state.pendingBattleDetails = null;
    },
    setLastEndedQuestId: (
      state,
      action: PayloadAction<QuestStoryId | null>,
    ) => {
      state.lastEndedQuestId = action.payload;
    },
    setPendingBattleDetails: (
      state,
      action: PayloadAction<BattleDetails | null>,
    ) => {
      state.pendingBattleDetails = action.payload;
    },
    resetQuestState: (state) => {
      state.acceptedQuest = null;
      state.currentStoryPointId = null;
      state.lastEndedQuestId = null;
      state.pendingBattleDetails = null;
    },
  },
});

export const {
  setAcceptedQuest,
  setCurrentStoryPointId,
  resetFailedQuestToFirstPoint,
  markQuestCompletedAndClearState,
  markQuestFailedAndClearState,
  setLastEndedQuestId,
  setPendingBattleDetails,
  resetQuestState,
} = questSlice.actions;

export const selectAcceptedQuest = (state: RootState) =>
  state.quest.acceptedQuest;

export const selectCurrentStoryPointId = (state: RootState) =>
  state.quest.currentStoryPointId;

export const selectCurrentStoryPoint = (state: RootState) => {
  const acceptedQuest = state.quest.acceptedQuest;
  const currentStoryPointId = state.quest.currentStoryPointId;

  if (!acceptedQuest || !currentStoryPointId) {
    return null;
  }

  return acceptedQuest.storyPoints.find(
    (point) => point.id === currentStoryPointId,
  ) ?? null;
};

export const selectLastEndedQuestId = (state: RootState) =>
  state.quest.lastEndedQuestId;

export const selectPendingBattleDetails = (state: RootState) =>
  state.quest.pendingBattleDetails;

export const selectQuestState = (state: RootState) => state.quest;

export default questSlice.reducer;
