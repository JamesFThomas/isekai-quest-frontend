import { QuestStory } from '@/types/quest';

export const banditWatchQuest: QuestStory = {
  id: 'banditWatch',
  name: 'Bandit Watch',
  description:
    'Town guards report increased bandit activity. Assist in fortifying the road or ambushing raiders.',
  storyPoints: [
    {
      id: 'bw-p1',
      imageSrc: '/images/quests/bandit_watch/start.png',
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
      ],
    },
    // Additional story points can be added here
  ],
};
