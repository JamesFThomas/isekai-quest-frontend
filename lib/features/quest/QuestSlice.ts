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
      state.acceptedQuest = action.payload;
    },
    setCurrentStoryPointId: (
      state,
      action: PayloadAction<StoryPointId | null>
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

export default questSlice.reducer;
