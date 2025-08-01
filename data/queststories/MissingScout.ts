import { QuestStory } from '@/types/quest';

export const missingScoutQuest: QuestStory = {
  id: 'missingScout',
  name: 'Missing Scout',
  description:
    'A guild scout failed to return from a routine perimeter check. Find out what happened.',
  storyPoints: [
    {
      id: 'ms-p1',
      imageSrc: '/images/quests/missing_scout/start.png',
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
      ],
    },
    // Additional story points can be added here
  ],
};
