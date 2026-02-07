import { QuestStory } from '@/types/quest';

// TODO: replace with your real opponent import when ready
import { unknownRider } from '../gameData/opponents';

export const ambushReconQuest: QuestStory = {
  disabled: false,
  id: 'ambushReconQuest',
  name: 'Ambush Alley Recon',
  description:
    'A guild patrol contract sends you to Ambush Alley to gather intel on bandit tactics, numbers, and escape routes. The task is reconnaissance, not victory.',
  coverImageSrc: '/quests/placeholder_images/cover.png',
  storyPoints: [
    {
      id: '1',
      imageSrc: '/quests/placeholder_images/1.png',
      text: 'Your character accepts the quest to patrol the stretch of highway called Ambush Alley where a merchant convoy was recently ambushed. The guild needs to collect any information that can explain how the ambush happened, which direction did the attackers come from, estimate how many in total, and which way did they retreat.',
      choices: [
        {
          label: 'a',
          text: 'Head toward Ambush Alley',
          nextPointId: '2',
        },
      ],
    },

    {
      id: '2',
      imageSrc: '/quests/placeholder_images/2.png',
      text: 'While traveling to Ambush Alley, your character is given the choice to walk the main road which was recently completed in plain sight or travel the old footpath adjacent to the road that at one point was the only way to reach Startsville from other towns.',
      choices: [
        {
          label: 'a',
          text: 'Travel the main road',
          nextPointId: '3A',
        },
        {
          label: 'b',
          text: 'Travel the old footpath',
          nextPointId: '3B',
        },
      ],
    },

    {
      id: '3A',
      imageSrc: '/quests/placeholder_images/3.png',
      text: 'As the character travels the road, they can see a figure in the distance laying still in the roadway.',
      choices: [
        {
          label: 'a',
          text: 'Approach cautiously',
          nextPointId: '4A',
        },
        {
          label: 'b',
          text: 'Approach normally',
          nextPointId: '10D',
        },
      ],
    },

    {
      id: '3B',
      imageSrc: '/quests/placeholder_images/3.png',
      text: 'As the character travels the old footpath alongside of the highway they can see multiple figures in the distance crouching along the tree line, partially camouflaged from the road, but intently focused on something toward the roadway.',
      choices: [
        {
          label: 'a',
          text: 'Observe from hidden position',
          nextPointId: '4B',
        },
      ],
    },

    {
      id: '4A',
      imageSrc: '/quests/placeholder_images/4.png',
      text: 'Your character moves closer to the figure laying in the road but remains on guard as they continue moving closer. Cautiously moving forward your character and now walking along the edge of the highway shrouded by the shadows of the tree line and can detect multiple figures crouched in the bushes on the opposite side of the road.',
      choices: [
        {
          label: 'a',
          text: 'Remain hidden and observe',
          nextPointId: '5A',
        },
        {
          label: 'b',
          text: 'Reveal yourself',
          nextPointId: '10D',
        },
      ],
    },

    {
      id: '4B',
      imageSrc: '/quests/placeholder_images/4.png',
      text: 'Your character slows their walking pace and moves closer to the edge of the path shrouding their presence in the shadows from the tree line. From here they are able to move closer to the figures without being detected.',
      choices: [
        {
          label: 'a',
          text: 'Move closer, remain hidden',
          nextPointId: '5B',
        },
        {
          label: 'b',
          text: 'Decide no threat and move forward normally',
          nextPointId: '10D',
        },
      ],
    },

    {
      id: '5A',
      imageSrc: '/quests/placeholder_images/5.png',
      text: 'While shrouded a carriage traveling the road passes your character traveling toward the figure in the middle of the road. Upon reaching the figure the carriage stops before running it over and the driver dismounts to inspect the obstruction in the road. The driver is ambushed by the figures you noticed in the bushes.',
      choices: [
        {
          label: 'a',
          text: 'Rush to help the carriage driver',
          nextPointId: '10D',
        },
        {
          label: 'b',
          text: 'Observe the battle and collect data',
          nextPointId: '6',
        },
      ],
    },

    {
      id: '5B',
      imageSrc: '/quests/placeholder_images/5.png',
      text: "As your character moves closer to the camouflaged figures on the footpath, you hear a carriage approaching from the road, and notice the figures mutter 'get ready.'",
      choices: [
        {
          label: 'a',
          text: 'Continue to observe ambush from footpath and collect data',
          nextPointId: '6',
        },
        {
          label: 'b',
          text: 'Attempt to alert the oncoming carriage by running onto the roadway',
          nextPointId: '10D',
        },
      ],
    },

    {
      id: '6',
      imageSrc: '/quests/placeholder_images/6.png',
      text: 'Having observed an ambush on the roadway and collected the needed data your character can head back to the guild hall to report data marking the quest as done and claim their reward in the process.',
      choices: [
        {
          label: 'a',
          text: 'Return quickly to the guild hall',
          nextPointId: '10D',
        },
        {
          label: 'b',
          text: 'Remain cautiously hidden for a few more moments',
          nextPointId: '7A',
        },
        {
          label: 'c',
          text: 'Attempt to check on the carriage and driver',
          nextPointId: '7B',
        },
      ],
    },

    {
      id: '7A',
      imageSrc: '/quests/placeholder_images/7.png',
      text: 'You watch the ambush party go by to the south and record that final piece of data for a full report to the guild. You see them disappear into the distance along the road. Once out of sight you return to town to make your report to the guild and mark the quest complete.',
      choices: [
        {
          label: 'a',
          text: 'Return to the guild and complete the quest',
          nextPointId: '10A',
        },
      ],
    },

    {
      id: '7B',
      imageSrc: '/quests/placeholder_images/7.png',
      text: "As you move cautiously towards the road to check on the aftermath you see the driver's body in the middle of the road with the carriage door open.",
      choices: [
        {
          label: 'a',
          text: 'Attempt to help the driver',
          nextPointId: '8A',
        },
        {
          label: 'b',
          text: 'Check the carriage',
          nextPointId: '8B',
        },
        {
          label: 'c',
          text: 'Note the retreat direction and leave the scene alone',
          nextPointId: '10A',
        },
      ],
    },

    {
      id: '8A',
      imageSrc: '/quests/placeholder_images/8.png',
      text: 'You touch the body to roll it over and blood covers your hands and clothes. At the same time an unknown figure gallops toward you shouting halt.',
      choices: [
        {
          label: 'a',
          text: 'Stand your ground',
          nextPointId: '9A',
        },
        {
          label: 'b',
          text: 'Attempt to explain',
          nextPointId: '10D',
        },
      ],
    },

    {
      id: '8B',
      imageSrc: '/quests/placeholder_images/8.png',
      text: 'You look inside the carriage and notice a dead noble with what looks like something lodged underneath their body.',
      choices: [
        {
          label: 'a',
          text: "Move the body and take what's underneath",
          nextPointId: '9B',
        },
        {
          label: 'b',
          text: 'Leave the scene untouched, note everything, and return to the guild',
          nextPointId: '10A',
        },
      ],
    },

    {
      id: '9A',
      imageSrc: '/quests/placeholder_images/9.png',
      text: 'The rider closes distance fast, convinced you are responsible. There is no time to negotiate.',
      choices: [
        {
          label: 'a',
          text: 'Fight the rider',
          nextPointId: '10A',
          outcome: {
            battle: {
              opponent: unknownRider,
              escapeAllowed: true,
              // reward/escapePenalty handled later when we wire outcomes
            },
          },
        },
        {
          label: 'b',
          text: 'Flee the confrontation',
          nextPointId: '10B',
        },
      ],
    },

    {
      id: '9B',
      imageSrc: '/quests/placeholder_images/9.png',
      text: 'You move the body and obtain a new special item. Quickly securing the item you leave the carriage and return to the guild hall to complete the quest by turning in the data.',
      choices: [
        {
          label: 'a',
          text: 'Return to the guild with the item',
          nextPointId: '10C',
        },
      ],
    },

    {
      id: '10A',
      imageSrc: '/quests/placeholder_images/10.png',
      text: 'Quest complete. Data turned in.',
      choices: [
        {
          label: 'a',
          text: 'Continue',
          nextPointId: null,
        },
      ],
    },

    {
      id: '10B',
      imageSrc: '/quests/placeholder_images/10.png',
      text: 'Quest failed. Character makes it back to town but is arrested for the crime of ambush by word of the unknown figure.',
      choices: [
        {
          label: 'a',
          text: 'Continue',
          nextPointId: null,
        },
      ],
    },

    {
      id: '10C',
      imageSrc: '/quests/placeholder_images/10.png',
      text: 'Quest complete. Data turned in and new item in inventory.',
      choices: [
        {
          label: 'a',
          text: 'Continue',
          nextPointId: null,
        },
      ],
    },

    {
      id: '10D',
      imageSrc: '/quests/placeholder_images/10.png',
      text: 'The quest has been failed.',
      choices: [
        {
          label: 'a',
          text: 'Continue',
          nextPointId: null,
        },
      ],
    },
  ],
};
