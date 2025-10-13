export interface Character {
  id: string;
  name: string;
  avatar: string;
  hp: number;
  mp: number;
  baseAttackIds?: string[];
  equippedWeaponId?: string;
  learnedSkillIds?: string[];
  inventory?: Inventory;
}

// Characters will have an inventory of items, coins, and equipment
export interface Inventory {
  coins: Coins;
  weaponIds: string[]; // Unequipped weapons
  equipmentIds: string[]; // Armor, accessories, etc.
  rations: number; // Count of Rations for out-of-battle healing
  potionIds: string[]; // Potions with specific effects (stored by ID)
}

export interface Coins {
  gold: number;
  silver: number;
  copper: number;
}
