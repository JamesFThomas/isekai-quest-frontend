"use client";

import { ReactNode } from "react";
import { useAppDispatch } from "@/lib/reduxHooks";
import { setAvailableQuests } from "@/lib/features/quest/QuestSlice";
import questStories from "@/data/screenOptions/questsOptions";

interface GameDataProviderProps {
  children: ReactNode;
}

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
  const dispatch = useAppDispatch();

  dispatch(setAvailableQuests(questStories));

  return <>{children}</>;
};
