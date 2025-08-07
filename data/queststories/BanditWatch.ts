import { Opponent } from '@/types/battle';
import { QuestStory } from '@/types/quest';

const mockOpponent: Opponent = {
  opponentId: 'bandit-leader',
  name: 'Bandit Leader',
  hp: 100,
  mp: 30,
  attackIds: ['slash', 'intimidate'],
};

export default mockOpponent;

export const banditWatchQuest: QuestStory = {
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
              opponent: mockOpponent,
            },
          },
        },
      ],
    },
    // Additional story points can be added here
  ],
};
