import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/AuthSlice';
import characterReducer from './features/character/CharacterSlice';
import questReducer from './features/quest/QuestSlice';
import battleReducer from './features/battle/BattleSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      character: characterReducer,
      quest: questReducer,
      battle: battleReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
