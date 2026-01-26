import { BattleOption } from '@/types/battle';

// Paladin Attacks
export const holyJab: BattleOption = {
  id: 'paladin-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Holy Jab',
  description: '',
  battleOptionType: 'attack',
  type: 'battleOption',
  effect: {
    hp: -15,
  },
};

// Snow Elf Attacks
export const forstPalm: BattleOption = {
  id: 'snow-elf-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Frost Palm',
  type: 'battleOption',
  battleOptionType: 'attack',
  description: '',
  effect: {
    hp: -15,
  },
};

// Halfing Attacks
export const quickJab: BattleOption = {
  id: 'halfling-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Quick Jab',
  type: 'battleOption',
  battleOptionType: 'attack',
  description: '',
  effect: {
    hp: -15,
  },
};

// Barbarian Attacks
export const fistSmash: BattleOption = {
  id: 'barbarian-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Fist Smash',
  description: '',
  type: 'battleOption',
  battleOptionType: 'attack',
  effect: {
    hp: -15,
  },
};

// Necromancer Attacks
export const witherTouch: BattleOption = {
  id: 'necromancer-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Wither Touch',
  type: 'battleOption',
  battleOptionType: 'attack',
  description: '',
  effect: {
    hp: -15,
  },
};

// Dwarf Attacks
export const headButt: BattleOption = {
  id: 'dwarf-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Head Butt',
  description: '',
  type: 'battleOption',
  battleOptionType: 'attack',
  effect: {
    hp: -15,
  },
};

// Opponent Attacks
export const slash: BattleOption = {
  id: 'opponent-basic-attack',
  icon: '/battleaction_icons/unarmedAttack_icon.png',
  title: 'Slash',
  type: 'battleOption',
  battleOptionType: 'attack',
  description: '',
  effect: {
    hp: -15,
  },
};
