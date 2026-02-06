import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { QuestStory, StoryPointId } from '@/types/quest';

interface QuestState {
  acceptedQuest: QuestStory | null;
  currentStoryPointId?: StoryPointId | null;
}

const initialState: QuestState = {
  acceptedQuest: null,
  currentStoryPointId: null,
};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setAcceptedQuest: (state, action: PayloadAction<QuestStory | null>) => {
      // when accepting a new quest, set the accepted quest and reset the current story point ID to the first point of the new quest
      state.acceptedQuest = action.payload;

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
  },
});

// export actions when made
export const { setAcceptedQuest, setCurrentStoryPointId } = questSlice.actions;

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

export default questSlice.reducer;
