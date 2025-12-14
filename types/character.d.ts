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
  partyMembers?: Character[];
  equippedWeapon?: Weapon;
  equippedArmor?: Equipment;
}

// Characters will have an inventory of items, coins, and equipment
export interface Inventory {
  attacks?: BattleOption[];
  skills?: BattleOption[];
  coins?: Coins;  // accessible via inventory.coins.gold, etc.
  weapons?: Weapon[]; // Unequipped weapons
  equipment?: Equipment[]; // Armor, accessories, etc.
  rations?: Ration[]; // Count of Rations for out-of-battle healing
  potions?: BattleOption[]; // Potions with specific effects (stored by ID)
}

export interface Coins {
  gold: number;
  silver: number;
  copper: number;
}

export type InventoryItemType = 'weapon' | 'equipment' | 'potion' | 'ration' | 'coin';


export interface EffectfulItem {
  effect: {
    hp?: number,
    mp?: number
  };
  cost?: {
    hp?: number,
    mp?: number
  }
}

export interface InventoryItemBase extends EffectfulItem {
  id: string;
  icon: string;
  title: string;
  type: InventoryItemType;
  description: string;
  price?: Coins;
}

export interface Weapon extends InventoryItemBase { };

export interface Equipment extends InventoryItemBase { };

export interface Ration extends InventoryItemBase { };