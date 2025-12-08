import { QuestStory } from '@/types/quest';

import { herbGatheringQuest } from '../questStories/HerbGathering';
import { missingScoutQuest } from '../questStories/MissingScout';
import { banditWatchQuest } from '../questStories/BanditWatch';
import { marshLightsQuest } from '../questStories/MarshLights';
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
