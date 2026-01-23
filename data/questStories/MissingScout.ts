import { QuestStory } from '@/types/quest';

import { goblin } from '../gameData/opponents';

export const missingScoutQuest: QuestStory = {
  id: 'missingScout',
  name: 'Missing Scout',
  description:
    'One of the guild’s scouts went missing during a routine perimeter sweep. Your task is to investigate their last known location and uncover what led to their disappearance—be it accident, ambush, or something stranger.',
  coverImageSrc: '/quests/missing_scout/cover_image.png',
  storyPoints: [
    {
      id: 'ms-p1',
      imageSrc: '/quests/missing_scout/cover_image.png',
      text: 'You arrive at the last known location of the scout. The area is eerily quiet, with only the sound of rustling leaves.',
      choices: [
        {
          label: 'a',
          text: 'Search the nearby bushes',
          nextPointId: 'ms-p2',
        },
        {
          label: 'b',
          text: 'Climb a tree for a better view',
          nextPointId: 'ms-p3',
        },
        {
          label: 'c',
          text: 'Call out for the scout',
          nextPointId: 'ms-p4',
        },
        {
          label: 'd',
          text: 'Battle the air',
          nextPointId: 'bw-p5',
          outcome: {
            battle: {
              opponent: goblin,
              escapeAllowed: true,
            },
          },
        },
      ],
    },
    // Additional story points can be added here
  ],
};
