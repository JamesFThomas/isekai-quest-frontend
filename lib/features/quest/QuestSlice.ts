import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { QuestStory, QuestStoryId, StoryPointId } from '@/types/quest';

interface QuestState {
  acceptedQuest: QuestStory | null;
  currentStoryPointId?: StoryPointId | null;
  lastEndedQuestId?: QuestStoryId | null; // New state to track the last ended quest ID
}

const initialState: QuestState = {
  acceptedQuest: null,
  currentStoryPointId: null,
  lastEndedQuestId: null,
};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setAcceptedQuest: (state, action: PayloadAction<QuestStory | null>) => {
      // when accepting a new quest, set the accepted quest and reset the current story point ID to the first point of the new quest
      state.acceptedQuest = action.payload;

      // clear lastEndedQuestId when a new quest is accepted
      state.lastEndedQuestId = null;

      // set the current story point ID to the first point of the accepted quest
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
      }
    },
    markQuestCompletedAndClearState: (state) => {
      if (state.acceptedQuest) {
        state.acceptedQuest.completed = true;
        state.acceptedQuest = null;
        state.currentStoryPointId = null;
      }
    },
    setLastEndedQuestId: (
      state,
      action: PayloadAction<StoryPointId | null>,
    ) => {
      state.lastEndedQuestId = action.payload;
    },
  },
});

// export actions when made
export const {
  setAcceptedQuest,
  setCurrentStoryPointId,
  resetFailedQuestToFirstPoint,
  markQuestCompletedAndClearState,
  setLastEndedQuestId,
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
  );
};

export const selectLastEndedQuestId = (state: RootState) =>
  state.quest.lastEndedQuestId;

export default questSlice.reducer;
