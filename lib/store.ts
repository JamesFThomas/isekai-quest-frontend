import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/auth/AuthSlice";
import characterReducer from "./features/character/CharacterSlice";
import questReducer from "./features/quest/QuestSlice";
import battleReducer from "./features/battle/BattleSlice";
import toastReducer from "./features/toast/ToastSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  character: characterReducer,
  quest: questReducer,
  battle: battleReducer,
  toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
