import { BattleOption } from "./battle";

export type characterClass = 'paladin' | 'elf' | 'halfling' | 'barbarian' | 'necromancer' | 'dwarf';

export interface Character {
  id: string;
  name: string;
  avatar: string;
  hp: number;
  maxHp?: number;
  mp: number;
  maxMp?: number;
  class?: characterClass;
  level?: number;
  inventory?: Inventory;
}

// Characters will have an inventory of items, coins, and equipment
export interface Inventory {
  attacks?: BattleOption[];
  equippedWeapon?: string;
  skills?: BattleOption[];
  coins?: Coins;  // accessible via inventory.coins.gold, etc.
  weapons?: string[]; // Unequipped weapons
  equipment?: string[]; // Armor, accessories, etc.
  rations?: number; // Count of Rations for out-of-battle healing
  potions?: BattleOption[]; // Potions with specific effects (stored by ID)
}

export interface Coins {
  gold: number;
  silver: number;
  copper: number;
}
