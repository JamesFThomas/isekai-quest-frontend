import { QuestStory } from '@/types/quest';
import { banditWatchQuest } from '../questStories/BanditWatch';
import { herbGatheringQuest } from '../questStories/HerbGathering';
import { marshLightsQuest } from '../questStories/MarshLights';
import { missingScoutQuest } from '../questStories/MissingScout';
import { orchardTroubleQuest } from '../questStories/OrchardTrouble';

// this will hold an array of QuestStories objects
const questStories: QuestStory[] = [
  herbGatheringQuest,
  missingScoutQuest,
  banditWatchQuest,
  marshLightsQuest,
  orchardTroubleQuest,
];

export default questStories;
