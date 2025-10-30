export interface Character {
  id: string;
  name: string;
  avatar: string;
  hp: number;
  mp: number;
  attacks?: string[];
  equippedWeapon?: string;
  skills?: string[];
  inventory?: Inventory;
}

// Characters will have an inventory of items, coins, and equipment
export interface Inventory {
  coins?: Coins;
  weapons?: string[]; // Unequipped weapons
  equipment?: string[]; // Armor, accessories, etc.
  rations?: number; // Count of Rations for out-of-battle healing
  potions?: string[]; // Potions with specific effects (stored by ID)
}

export interface Coins {
  gold: number;
  silver: number;
  copper: number;
}
