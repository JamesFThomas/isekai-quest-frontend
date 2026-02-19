import { QuestStory } from '@/types/quest';

import { goblin } from '../gameData/opponents';

export const orchardTroubleQuest: QuestStory = {
  disabled: true, // Set to true to disable this quest until it's fully implemented
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
          text: 'Test apply effect thunk',
          nextPointId: 'ot-p2',
          outcome: {
            effect: {
              hp: 5,
              mp: 5,
              coins: { gold: 10, silver: 5, copper: 10 },
              items: [
                // test potion
                {
                  id: 'test-potion',
                  icon: '/inventory_icons/fullBottle_icon.png',
                  title: 'Test Potion',
                  type: 'potion',
                  description: 'A potion used for testing effect application.',
                  effect: {
                    hp: 20,
                    mp: 10,
                  },
                },
                // test weapon
                {
                  id: 'test-sword',
                  icon: '/inventory_icons/sword_icon.png',
                  title: 'Test Sword',
                  type: 'weapon',
                  description: 'A sword used for testing effect application.',
                },
                // test ration
                {
                  id: 'test-ration',
                  icon: '/inventory_icons/ration_icon.png',
                  title: 'Test Ration',
                  type: 'ration',
                  description: 'A ration used for testing effect application.',
                  effect: {
                    hp: 15,
                    mp: 5,
                  },
                },
              ],
            },
          },
        },
        {
          label: 'b',
          text: 'End with no reward added to test failed node logic',
          nextPointId: 'ot-p2',
        },
        {
          label: 'c',
          text: 'Talk to the farmers about their observations',
          nextPointId: 'ot-p4',
        },
        {
          label: 'd',
          text: 'Test battle with Goblin',
          nextPointId: 'ot-p3',
          outcome: {
            battle: {
              opponent: goblin,
              escapeAllowed: true,
              escapePenalty: {
                hp: -5,
                mp: -5,
              },
              reward: {
                hp: 10,
                mp: 10,
                coins: { gold: 5, silver: 0, copper: 0 },
                items: [
                  {
                    id: 'goblin-ear',
                    icon: '/inventory_icons/armor_icon.png',
                    title: 'Goblin Ear',
                    type: 'equipment',
                    description:
                      'The ear of a defeated goblin. It may be worth something to the right buyer.',
                  },
                ],
              },
            },
          },
        },
      ],
    },
    // Additional story points can be added here
    {
      id: 'ot-p2',
      imageSrc: '/quests/placeholder_images/2.png',
      text: 'Nothing else check to see if your items were added to inventory and coins were added to character state',
      choices: [
        // create an ending node to test end state logic
        {
          label: 'a',
          text: 'Complete Quest',
          nextPointId: null,
          outcome: {
            endState: 'completed',
          },
        },
        // create failing ending node to test fail state logic
        {
          label: 'b',
          text: 'Fail Quest',
          nextPointId: null,
          outcome: {
            endState: 'failed',
          },
        },
      ],
    },
    // Create completed ending node for after winning battle
    {
      id: 'ot-p3',
      imageSrc: '/quests/placeholder_images/3.png',
      text: 'You have defeated the goblin and protected the orchard! The farmers are grateful for your help.',
      choices: [
        {
          label: 'a',
          text: 'Complete Quest',
          nextPointId: null,
          outcome: {
            endState: 'completed',
          },
        },
      ],
    },
    // Create failed ending node for after losing battle
  ],
};
