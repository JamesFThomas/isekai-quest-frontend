import { Character } from '@/types/character';

import { fistSmash, headButt, holyJab, quickJab, forstPalm, witherTouch } from './gameData/attacks';
import { evade, block, radiantPalm, iceGust, luckyHook, ragingSlam, lifeSiphon, earthshakerStomp } from './gameData/skills';

const Tony: Character = {
  id: 'char-1',
  name: 'Tony',
  avatar: '/character_avatars/barbarian_avatar2.png',
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  class: 'barbarian',
  inventory: {
    attacks: [fistSmash],
    skills: [evade, block, ragingSlam],
  },
}

const Barbosa: Character = {
  id: 'char-1',
  name: 'Barbosa',
  avatar: '/character_avatars/barbarian_avatar2.png',
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  class: 'barbarian',
  inventory: {
    attacks: [fistSmash],
    skills: [evade, block, ragingSlam],
  },
  partyMembers: [Tony],
}

const Durgan: Character = {
  id: 'char-2',
  name: 'Durgan',
  avatar: '/character_avatars/dwarf_avatar2.png',
  hp: 75,
  maxHp: 100,
  mp: 40,
  maxMp: 50,
  class: 'dwarf',
  inventory: {
    attacks: [headButt],
    skills: [evade, block, earthshakerStomp],
  },
  partyMembers: [Tony, Barbosa],
};

const Perrin: Character = {
  id: 'char-3',
  name: 'Perrin',
  avatar: '/character_avatars/paladin_avatar2.png',
  hp: 50,
  maxHp: 100,
  mp: 60,
  maxMp: 100,
  class: 'paladin',
  inventory: {
    attacks: [holyJab],
    skills: [evade, block, radiantPalm],
  },
  partyMembers: [Tony, Barbosa, Durgan],
};

const Hobbin: Character = {
  id: 'char-4',
  name: 'Hobbin',
  avatar: '/character_avatars/halfling_avatar2.png',
  hp: 25,
  maxHp: 100,
  mp: 25,
  maxMp: 50,
  class: 'halfling',
  inventory: {
    attacks: [quickJab],
    skills: [evade, block, luckyHook],
  },
  partyMembers: [Tony, Barbosa, Durgan, Perrin],
}

const Nereza: Character = {
  id: 'char-5',
  name: 'Nereza',
  avatar: '/character_avatars/necromancer_avatar2.png',
  hp: 70,
  maxHp: 100,
  mp: 120,
  maxMp: 150,
  class: 'necromancer',
  inventory: {
    attacks: [witherTouch],
    skills: [evade, block, lifeSiphon],
  },
  partyMembers: [Tony, Durgan, Perrin, Hobbin],
};

const Seryn: Character = {
  id: 'char-6',
  name: 'Seryn',
  avatar: '/character_avatars/snowElf_avatar2.png',
  hp: 80,
  maxHp: 100,
  mp: 90,
  maxMp: 200,
  class: 'elf',
  inventory: {
    attacks: [forstPalm],
    skills: [evade, block, iceGust],
  },
  partyMembers: [Barbosa, Nereza, Hobbin, Tony],
};


const characterOptions: Character[] = [
  Barbosa,
  Durgan,
  Perrin,
  Hobbin,
  Nereza,
  Seryn,
];

export default characterOptions;
