import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { QuestStory } from '@/types/quest';

interface QuestState {
  acceptedQuest: QuestStory | null;
}

const initialState: QuestState = {
  acceptedQuest: null,
};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setAcceptedQuest: (state, action: PayloadAction<QuestStory | null>) => {
      state.acceptedQuest = action.payload;
    },
  },
});

// export actions when made
export const { setAcceptedQuest } = questSlice.actions;

export const selectAcceptedQuest = (state: RootState) =>
  state.quest.acceptedQuest;

export default questSlice.reducer;
