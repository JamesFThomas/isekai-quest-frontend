import { QuestStory } from '@/types/quest';

export const orchardTroubleQuest: QuestStory = {
  id: 'orchardTrouble',
  name: 'Orchard Trouble',
  description:
    'Local farmers report strange creatures raiding their orchard at night.',
  storyPoints: [
    {
      id: 'ot-p1',
      imageSrc: '/images/quests/orchard_trouble/start.png',
      text: 'You arrive at the orchard just as the sun sets. The air is filled with the sweet scent of ripe fruit, but something feels off.',
      choices: [
        {
          label: 'a',
          text: 'Set up a watch near the trees',
          nextPointId: 'ot-p2',
        },
        {
          label: 'b',
          text: 'Search the perimeter for clues',
          nextPointId: 'ot-p3',
        },
        {
          label: 'c',
          text: 'Talk to the farmers about their observations',
          nextPointId: 'ot-p4',
        },
      ],
    },
    // Additional story points can be added here
  ],
};
