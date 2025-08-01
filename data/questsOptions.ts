import { QuestStory } from '@/types/quest';

import { herbGatheringQuest } from './queststories/HerbGathering';
import { missingScoutQuest } from './queststories//MissingScout';
import { banditWatchQuest } from './queststories//BanditWatch';
import { marshLightsQuest } from './queststories//MarshLights';
import { orchardTroubleQuest } from './queststories//OrchardTrouble';

// this will hold an array of QuestStories objects
const questStories: QuestStory[] = [
  herbGatheringQuest,
  missingScoutQuest,
  banditWatchQuest,
  marshLightsQuest,
  orchardTroubleQuest,
];

export default questStories;
