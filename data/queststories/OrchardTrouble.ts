import { Opponent } from '@/types/battle';
import { QuestStory } from '@/types/quest';

const mockOpponent: Opponent = {
  opponentId: 'bandit-leader',
  name: 'Bandit Leader',
  hp: 100,
  mp: 30,
  attackIds: ['slash', 'intimidate'],
};

export const orchardTroubleQuest: QuestStory = {
  id: 'orchardTrouble',
  name: 'Orchard Trouble',
  description:
    'Unusual creatures have been spotted raiding the village orchard after dark. Investigate the source of the disturbances and protect the harvest before more is lost.',
  coverImageSrc: '/quests/orchard_trouble/cover_image.png',
  storyPoints: [
    {
      id: 'ot-p1',
      imageSrc: '/quests/orchard_trouble/cover_image.png',
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
