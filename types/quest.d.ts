export type QuestStory = {
  id: string;
  name: string;
  description: string;
  storyPoints: StoryPoint[];
};

export type StoryPoint = {
  id: string;
  imageSrc: string;
  text: string;
  battle?: BattleDetails;
  choices: StoryPointChoice[];
};

export type StoryPointChoice = {
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  outcome?: StoryPointOutcome;
  nextPointId: string;
};

export type StoryPointOutcome = {
  statChanges?: {
    health?: number;
    xp?: number;
    gold?: number;
  };
  itemReward?: string;
};
