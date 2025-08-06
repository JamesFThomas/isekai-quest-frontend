import { Opponent } from '@/lib/features/battle/BattleSlice';

export type QuestStory = {
  id: string;
  name: string;
  description: string;
  storyPoints: StoryPoint[];
};

type StoryPointId = string;

export type StoryPoint = {
  id: StoryPointId;
  imageSrc: string;
  text: string;
  battle?: BattleDetails;
  choices: StoryPointChoice[];
};

export type StoryPointChoice = {
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  outcome?: StoryPointOutcome;
  nextPointId: StoryPointId | null; // null if it ends the quest
};

// export type StoryPointOutcome = (character: Character) => void;

export type StoryPointOutcome = {
  effects?: {
    // Character state changes
    // Game state changes
    health?: number;
    xp?: number;
    gold?: number;
  };
  reward?: string;
  battle?: BattleDetails;
};

export type BattleDetails = {
  opponent: Opponent; // imported from BattleSlice
  backgroundImage?: string;
  escapeAllowed?: boolean;
  escapePenalty?: StoryPointOutcome;
  nextPointId?: StoryPointId; // ID of the next story point after battle
};
