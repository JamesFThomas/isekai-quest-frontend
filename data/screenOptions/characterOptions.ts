import { Character } from '@/types/character';

import { fistSmash, headButt, holyJab, quickJab, forstPalm, witherTouch } from '../gameData/attacks';
import { evade, block, radiantPalm, iceGust, luckyHook, ragingSlam, lifeSiphon, earthshakerStomp } from '../gameData/skills';
import { dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe, halflingBasicSling, elfBasicBow, paladinBasicMace } from '../gameData/weapons'
import { paladinStarterArmor, elfStarterCloak, halflingStarterVest, barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail, travelersCloak, leatherBracers, sturdyBoots } from '../gameData/equipment';
import { driedRations, heartyStew, sweetTrailMix, waybreadLoaf } from '../gameData/rations';
import { minorHealingPotion, majorHealingPotion, manaTonic, greaterManaTonic, rejuvenationElixir, elixirOfVigor } from '../gameData/potions';

const Tony: Character = {
  id: 'char-1',
  name: 'Tony',
  avatar: '/character_avatars/barbarian_avatar3.png',
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  class: 'barbarian',
  inventory: {
    attacks: [fistSmash],
    skills: [evade, block, ragingSlam],
    coins: {
      gold: 150,
      silver: 150,
      copper: 150,
    }
  },
}

const Barbosa: Character = {
  id: 'char-1',
  name: 'Barbosa',
  avatar: '/character_avatars/barbarian_avatar3.png',
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  class: 'barbarian',
  inventory: {
    attacks: [fistSmash],
    skills: [evade, block, ragingSlam],
    weapons: [halflingBasicSling, elfBasicBow, paladinBasicMace],
    equipment: [paladinStarterArmor, elfStarterCloak, halflingStarterVest],
    rations: [driedRations, heartyStew, sweetTrailMix],
    potions: [minorHealingPotion, majorHealingPotion],
    coins: {
      gold: 50,
      silver: 50,
      copper: 50,
    }
  },
  partyMembers: [Tony],
}

const Durgan: Character = {
  id: 'char-2',
  name: 'Durgan',
  avatar: '/character_avatars/dwarf_avatar3.png',
  hp: 75,
  maxHp: 100,
  mp: 40,
  maxMp: 50,
  class: 'dwarf',
  inventory: {
    attacks: [headButt],
    skills: [evade, block, earthshakerStomp],
    weapons: [dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe],
    equipment: [barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail],
    rations: [waybreadLoaf],
    potions: [greaterManaTonic, rejuvenationElixir, elixirOfVigor],
    coins: {
      gold: 57,
      silver: 23,
      copper: 72,
    }
  },
  partyMembers: [Tony, Barbosa],
};

const Perrin: Character = {
  id: 'char-3',
  name: 'Perrin',
  avatar: '/character_avatars/paladin_avatar3.png',
  hp: 50,
  maxHp: 100,
  mp: 60,
  maxMp: 100,
  class: 'paladin',
  inventory: {
    attacks: [holyJab],
    skills: [evade, block, earthshakerStomp],
    weapons: [dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe],
    equipment: [barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail],
    rations: [waybreadLoaf],
    potions: [rejuvenationElixir, elixirOfVigor],
    coins: {
      gold: 84,
      silver: 12,
      copper: 100,
    }
  },
  partyMembers: [Tony, Barbosa, Durgan],
};

const Hobbin: Character = {
  id: 'char-4',
  name: 'Hobbin',
  avatar: '/character_avatars/halfling_avatar3.png',
  hp: 25,
  maxHp: 100,
  mp: 25,
  maxMp: 50,
  class: 'halfling',
  inventory: {
    attacks: [quickJab],
    skills: [evade, block, luckyHook],
    weapons: [dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe],
    equipment: [barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail],
    rations: [waybreadLoaf],
    potions: [minorHealingPotion, majorHealingPotion,],
    coins: {
      gold: 32,
      silver: 25,
      copper: 15,
    }
  },
  partyMembers: [Tony, Barbosa, Durgan, Perrin],
}

const Nereza: Character = {
  id: 'char-5',
  name: 'Nereza',
  avatar: '/character_avatars/necromancer_avatar3.png',
  hp: 70,
  maxHp: 100,
  mp: 120,
  maxMp: 150,
  class: 'necromancer',
  inventory: {
    attacks: [witherTouch],
    skills: [evade, block, lifeSiphon],
    weapons: [dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe],
    equipment: [barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail],
    rations: [waybreadLoaf],
    potions: [majorHealingPotion, manaTonic, rejuvenationElixir,],
    coins: {
      gold: 20,
      silver: 30,
      copper: 70,
    }
  },
  partyMembers: [Tony, Durgan, Perrin, Hobbin],
};

const Seryn: Character = {
  id: 'char-6',
  name: 'Seryn',
  avatar: '/character_avatars/snowElf_avatar3.png',
  hp: 80,
  maxHp: 100,
  mp: 90,
  maxMp: 200,
  class: 'elf',
  inventory: {
    attacks: [forstPalm],
    skills: [evade, block, iceGust],
    weapons: [dwarfBasicHammer, necromancerBasicWand, barbarianBasicAxe],
    equipment: [barbarianStarterHarness, necromancerStarterRobe, dwarfStarterMail],
    rations: [waybreadLoaf],
    potions: [majorHealingPotion, manaTonic, greaterManaTonic, elixirOfVigor],
    coins: {
      gold: 50,
      silver: 50,
      copper: 50,
    }
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
