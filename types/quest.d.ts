import type { Opponent } from "@/types/battle";
import type { InventoryItemBase, Coins } from "@/types/character";

export type StoryPointId = string;

export type QuestStoryId = string;

export type QuestStory = {
  id: QuestStoryId;
  name: string;
  description: string;
  storyPoints: StoryPoint[];
  locationId: string;
  prerequisiteQuestIds?: QuestStoryId[]; // all must be in the Character's completedQuestIds array
  coverImageSrc: string; // Optional cover image for the quest
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
  label: "a" | "b" | "c" | "d";
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
  endState?: "completed" | "failed";
};

export type BattleNextPoints = {
  win: StoryPointId;
  lose: StoryPointId;
  flee: StoryPointId;
};

export type BattleDetails = {
  // battleIds should be set here in the details to link to BattleSlice state
  opponent: Opponent;
  backgroundImage?: string;
  escapeAllowed: boolean;
  escapePenalty?: Effect;
  reward?: Effect;
  nextPoints?: BattleNextPoints;
};
