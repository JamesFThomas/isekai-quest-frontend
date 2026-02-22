import { QuestStory } from '@/types/quest';

// TODO: replace with your real opponent import when ready
import { unknownRider } from '../gameData/opponents';

export const ambushReconQuest: QuestStory = {
  disabled: false,
  completed: false,
  id: 'ambushReconQuest',
  name: 'Ambush Alley Recon',
  description:
    'A guild patrol contract sends you to Ambush Alley to gather intel on bandit tactics, numbers, and escape routes. The task is reconnaissance, not victory.',
  coverImageSrc: '/quests/ambush_recon/ambush_cover.png',
  storyPoints: [
    {
      id: '1',
      imageSrc: '/quests/ambush_recon/ambush_sp1.png',
      text: 'Your character accepts the quest to patrol the stretch of highway called Ambush Alley where a merchant convoy was recently ambushed. The guild needs to collect any information that can explain how the ambush happened, which direction did the attackers come from, estimate how many in total, and which way did they retreat.',
      choices: [
        {
          label: 'a',
          text: 'Head toward Ambush Alley',
          nextPointId: '2',
        },
        {
          label: 'b',
          text: 'Have a drink at the tavern first',
          nextPointId: '1F',
        },
      ],
    },
    {
      id: '1F',
      imageSrc: '/quests/ambush_recon/ambush_sp1f.png',
      text: 'While having a drink another ambush occurred and a high noble as been killed. The guild has marked the quest as failed and you can no longer complete it.',
      choices: [
        {
          label: 'a',
          text: 'Return to guild hall',
          nextPointId: '10B',
        },
      ],
    },

    {
      id: '2',
      imageSrc: '/quests/ambush_recon/ambush_sp2.png',
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
      imageSrc: '/quests/ambush_recon/3.png',
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
          nextPointId: '3F',
        },
      ],
    },

    {
      id: '3B',
      imageSrc: '/quests/ambush_recon/3.png',
      text: 'As the character travels the old footpath alongside of the highway they can see multiple figures in the distance crouching along the tree line, partially camouflaged from the road, but intently focused on something toward the roadway.',
      choices: [
        {
          label: 'a',
          text: 'Observe from hidden position',
          nextPointId: '4B',
        },
        {
          label: 'b',
          text: 'Approach normally',
          nextPointId: '3F',
        },
      ],
    },
    {
      id: '3F',
      imageSrc: '/quests/ambush_recon/ambush_sp3f.png',
      text: 'You continue forward in plain sight. The hidden figures notice you immediately and scatter before you can gather useful information. The trail goes cold, and the guild later marks the contract as failed.',
      choices: [
        {
          label: 'a',
          text: 'Return to town',
          nextPointId: '10B',
        },
      ],
    },

    {
      id: '4A',
      imageSrc: '/quests/ambush_recon/ambush_sp4a.png',
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
          nextPointId: '5F',
        },
      ],
    },

    {
      id: '4B',
      imageSrc: '/quests/ambush_recon/4.png',
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
          nextPointId: '5F',
        },
      ],
    },

    {
      id: '5A',
      imageSrc: '/quests/ambush_recon/ambush_sp5a.png',
      text: 'While shrouded a carriage traveling the road passes your character traveling toward the figure in the middle of the road. Upon reaching the figure the carriage stops before running it over and the driver dismounts to inspect the obstruction in the road. The driver is ambushed by the figures you noticed in the bushes.',
      choices: [
        {
          label: 'a',
          text: 'Rush to help the carriage driver',
          nextPointId: '5F',
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
      imageSrc: '/quests/ambush_recon/ambush_sp5b.png',
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
          nextPointId: '5F',
        },
      ],
    },
    {
      id: '5F',
      imageSrc: '/quests/ambush_recon/5.png',
      text: 'You act too openly and the ambush party reacts fast. They scatter into the brush before you can confirm numbers or retreat routes. By the time you return to town, the guild marks the contract as failed.',
      choices: [
        {
          label: 'a',
          text: 'Return to town',
          nextPointId: '10B',
        },
      ],
    },

    {
      id: '6',
      imageSrc: '/quests/ambush_recon/ambush_sp6.png',
      text: 'Having observed an ambush on the roadway and collected the needed data your character can head back to the guild hall to report data marking the quest as done and claim their reward in the process.',
      choices: [
        {
          label: 'a',
          text: 'Return quickly to the guild hall',
          nextPointId: '10A',
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
      imageSrc: '/quests/ambush_recon/ambush_sp7a.png',
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
      imageSrc: '/quests/ambush_recon/ambush_sp7b.png',
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
      imageSrc: '/quests/ambush_recon/ambush_sp8a.png',
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
          nextPointId: '8F',
        },
      ],
    },
    {
      id: '8B',
      imageSrc: '/quests/ambush_recon/ambush_sp8b.png',
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
      id: '8F',
      imageSrc: '/quests/ambush_recon/ambush_sp8f.png',
      text: 'You raise your hands and try to explain, but the rider does not listen. You are detained and dragged back to town. Hours later, a guild officer confirms your contract and the situation cools. You are released, bruised and furious, but your report still counts.',
      choices: [
        {
          label: 'a',
          text: 'Leave the guardhouse and head to the guild',
          nextPointId: '10A',
        },
      ],
    },

    {
      id: '9A',
      imageSrc: '/quests/ambush_recon/ambush_sp9a.png',
      text: 'The rider closes distance fast, convinced you are responsible. There is no time to negotiate.',
      choices: [
        {
          label: 'a',
          text: 'Fight the rider',
          nextPointId: '9F',
          outcome: {
            battle: {
              opponent: unknownRider,
              escapeAllowed: false,
              nextPoints: {
                win: '9F',
                lose: '9F',
                flee: '9F',
              },
            },
          },
        },
        {
          label: 'b',
          text: 'Flee the confrontation',
          nextPointId: '9F',
        },
      ],
    },

    {
      id: '9B',
      imageSrc: '/quests/ambush_recon/ambush_sp9b.png',
      text: 'You move the body and obtain a new special item. Quickly securing the item you leave the carriage and return to the guild hall to complete the quest by turning in the data.',
      choices: [
        {
          label: 'a',
          text: 'Keep the item and leave quickly',
          nextPointId: '9C',
        },
        {
          label: 'b',
          text: 'Throw the item away and leave the scene',
          nextPointId: '9D',
        },
      ],
    },
    {
      id: '9C',
      imageSrc: '/quests/ambush_recon/ambush_sp9c.png',
      text: 'You tuck the item away and slip back onto the road before anyone returns.',
      choices: [
        {
          label: 'a',
          text: 'Return to the guild and file your report',
          nextPointId: '10A',
          outcome: {
            effect: {
              items: [
                {
                  id: 'ambush-relic',
                  icon: '/inventory_icons/armor_icon.png',
                  title: 'Noble Signet Ring',
                  type: 'equipment',
                  description: 'A noble signet ring.',
                },
              ],
            },
          },
        },
      ],
    },
    {
      id: '9D',
      imageSrc: '/quests/ambush_recon/ambush_sp9d.png',
      text: 'You stare at the item for a moment, then shove it back where you found it and step away. Some things are not worth the trouble.',
      choices: [
        {
          label: 'a',
          text: 'Return to the guild and file your report',
          nextPointId: '10A',
        },
      ],
    },
    {
      id: '9F',
      imageSrc: '/quests/ambush_recon/ambush_sp9f.png',
      text: 'Whether you drew steel or tried to run, the rider got a clear look at you at the scene. By the time you reach town, the story is already ahead of you. Guards seize you in the street, and the rider’s accusation is treated as law. The guild cannot outrank a sworn rider, and your contract is marked as failed.',
      choices: [
        {
          label: 'a',
          text: 'Submit to arrest',
          nextPointId: '10B',
        },
      ],
    },

    {
      id: '10A',
      imageSrc: '/quests/ambush_recon/ambush_sp10a.png',
      text: 'Quest complete. Report submitted.',
      choices: [
        {
          label: 'a',
          text: 'Quest Complete',
          nextPointId: null,
          outcome: {
            endState: 'completed',
          },
        },
      ],
    },
    {
      id: '10B',
      imageSrc: '/quests/ambush_recon/ambush_sp10b.png',
      text: 'The quest has been failed.',
      choices: [
        {
          label: 'a',
          text: 'Quest Failed',
          nextPointId: null,
          outcome: {
            endState: 'failed',
          },
        },
      ],
    },
  ],
};
