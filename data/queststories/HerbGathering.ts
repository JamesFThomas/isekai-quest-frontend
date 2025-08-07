import { QuestStory } from '@/types/quest';

export const herbGatheringQuest: QuestStory = {
  id: 'q1',
  name: 'Herb Gathering',
  description:
    'The village healer needs herbs from the foothills. Follow the trails outside town and collect what you can from the wild.',
  coverImageSrc: '/quests/herb_gathering/cover_image.png',
  storyPoints: [
    {
      id: 'q1-p1',
      imageSrc: '/images/quests/herb_gathering/path_choice.png',
      text: 'You head out of town toward the nearby mountains in search of the herbs needed to complete the quest. You reach a sign on the path that points out the paths into the mountains in front of you.',
      choices: [
        {
          label: 'a',
          text: 'Choose path 1',
          nextPointId: 'q1-p2',
        },
        {
          label: 'b',
          text: 'Choose path 2',
          nextPointId: 'q1-p2',
        },
        {
          label: 'c',
          text: 'Choose path 3',
          nextPointId: 'q1-p2',
        },
        {
          label: 'd',
          text: 'Return to town',
          nextPointId: 'q1-p2',
        },
      ],
    },
  ],
};
