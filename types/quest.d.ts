import { Opponent } from '@/lib/features/battle/BattleSlice';
import { InventoryItemBase } from '@/lib/features/inventory/InventorySlice';
import { Coins } from '@/lib/features/character/CharacterSlice';

export type StoryPointId = string;

export type QuestStoryId = string;

export type QuestStory = {
  id: QuestStoryId;
  name: string;
  description: string;
  storyPoints: StoryPoint[];
  coverImageSrc: string; // Optional cover image for the quest
  disabled?: boolean; // Optional flag to indicate if the quest is currently unavailable
  completed?: boolean; // Optional flag to indicate if the quest has been completed
};

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
export type Effect = {
  hp?: number;
  mp?: number;
  coins?: Coins;
  items?: InventoryItemBase[];
};

export type StoryPointOutcome = {
  effect?: Effect;
  battle?: BattleDetails;
  endState?: 'completed' | 'failed';
};

export type BattleNextPoints = {
  win: StoryPointId;
  lose: StoryPointId;
  flee: StoryPointId;
};

export type BattleDetails = {
  // battleIds should be set here in the details to link to BattleSlice state
  opponent: Opponent; // imported from BattleSlice
  backgroundImage?: string;
  escapeAllowed: boolean;
  escapePenalty?: Effect;
  reward?: Effect;
  nextPoints?: BattleNextPoints; // possible quest branch stroypoints based on battle outcome
};
