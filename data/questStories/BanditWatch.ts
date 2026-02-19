import { QuestStory } from '@/types/quest';

import { goblin } from '../gameData/opponents';

export const banditWatchQuest: QuestStory = {
  disabled: true, // Set to true to disable this quest until it's fully implemented
  id: 'banditWatch',
  name: 'Bandit Watch',
  description:
    'A merchant seeks safe passage through a dangerous stretch of road known for bandit ambushes. Join the escort and ensure their goods and life arrive safely at the next village.',
  coverImageSrc: '/quests/bandit_watch/cover_image.png',
  storyPoints: [
    {
      id: 'bw-p1',
      imageSrc: '/quests/bandit_watch/cover_image.png',
      text: 'You arrive at the outskirts of town where the guards have set up a temporary watch. The road ahead is quiet, but tension hangs in the air.',
      choices: [
        {
          label: 'a',
          text: 'Help fortify the watchtower',
          nextPointId: 'bw-p2',
        },
        {
          label: 'b',
          text: 'Scout the road for bandit activity',
          nextPointId: 'bw-p3',
        },
        {
          label: 'c',
          text: 'Set an ambush for the bandits',
          nextPointId: 'bw-p4',
        },
        {
          label: 'd',
          text: 'Battle the air',
          nextPointId: 'bw-p5',
          outcome: {
            battle: {
              opponent: goblin,
              escapeAllowed: false,
              reward: {
                hp: 10,
                mp: 10,
                coins: { gold: 5, silver: 10, copper: 0 },
              },
            },
          },
        },
      ],
    },
    // Additional story points can be added here
  ],
};
