import { Character } from '@/types/character';

import { fistSmash, headButt, holyJab, quickJab, forstPalm, witherTouch } from './gameData/attacks';
import { evade, block, radiantPalm, iceGust, luckyHook, ragingSlam, lifeSiphon, earthshakerStomp } from './gameData/skills';

const characterOptions: Character[] = [
  {
    id: 'char-1',
    name: 'Barbosa',
    avatar: '/character_avatars/barbarian_avatar2.png',
    hp: 100,
    mp: 50,
    class: 'barbarian',
    attacks: [fistSmash],
    skills: [evade, block, ragingSlam],
  },
  {
    id: 'char-2',
    name: 'Durgan',
    avatar: '/character_avatars/dwarf_avatar2.png',
    hp: 110,
    mp: 40,
    class: 'dwarf',
    attacks: [headButt],
    skills: [evade, block, earthshakerStomp],
  },
  {
    id: 'char-3',
    name: 'Perrin',
    avatar: '/character_avatars/paladin_avatar2.png',
    hp: 90,
    mp: 60,
    class: 'paladin',
    attacks: [holyJab],
    skills: [evade, block, radiantPalm],
  },
  {
    id: 'char-4',
    name: 'Hobbin',
    avatar: '/character_avatars/halfling_avatar2.png',
    hp: 85,
    mp: 55,
    class: 'halfling',
    attacks: [quickJab],
    skills: [evade, block, luckyHook],
  },
  {
    id: 'char-5',
    name: 'Nereza',
    avatar: '/character_avatars/necromancer_avatar2.png',
    hp: 70,
    mp: 100,
    class: 'necromancer',
    attacks: [witherTouch],
    skills: [evade, block, lifeSiphon],
  },
  {
    id: 'char-6',
    name: 'Seryn',
    avatar: '/character_avatars/snowElf_avatar2.png',
    hp: 80,
    mp: 90,
    class: 'elf',
    attacks: [forstPalm],
    skills: [evade, block, iceGust],
  },
];

export default characterOptions;
