import { QuestStory } from '@/types/quest';

export const marshLightsQuest: QuestStory = {
  id: 'marshLights',
  name: 'Marsh Lights',
  description:
    'Strange lights have been seen drifting across the wetlands beyond the village. Some say they’re spirits, others claim smugglers or arcane forces at work. Travel to the marshes and uncover the truth behind the glowing phenomenon',
  coverImageSrc: '/quests/marsh_lights/cover_image.png',
  storyPoints: [
    {
      id: 'ml-p1',
      imageSrc: '/images/quests/marsh_lights/start.png',
      text: 'You arrive at the edge of the marsh as dusk falls. The air is thick with mist, and faint lights flicker in the distance.',
      choices: [
        {
          label: 'a',
          text: 'Approach the lights cautiously',
          nextPointId: 'ml-p2',
        },
        {
          label: 'b',
          text: 'Set up camp and wait for morning',
          nextPointId: 'ml-p3',
        },
        {
          label: 'c',
          text: 'Search for tracks or signs of activity',
          nextPointId: 'ml-p4',
        },
      ],
    },
    // Additional story points can be added here
  ],
};
