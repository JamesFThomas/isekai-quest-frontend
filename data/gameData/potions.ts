import type { BattleOption } from '@/types/battle';

export const minorHealingPotion: BattleOption = {
    id: 'potion-minor-healing',
    icon: '/inventory_icons/fullBottle_icon.png',
    title: 'Minor Healing Potion',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'A weak healing draught that restores a small amount of health.',
    effect: { hp: 15 },
    cost: { mp: 0 },
    price: { gold: 5, silver: 0, copper: 0 }
};

export const majorHealingPotion: BattleOption = {
    id: 'potion-major-healing',
    icon: '/inventory_icons/fullBottle_icon.png',
    title: 'Major Healing Potion',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'A potent elixir that rapidly restores a large amount of health.',
    effect: { hp: 50 },
    cost: { mp: 0 },
    price: { gold: 20, silver: 0, copper: 0 }
};

export const manaTonic: BattleOption = {
    id: 'potion-mana-tonic',
    icon: '/inventory_icons/fullBottle_icon.png',
    title: 'Mana Tonic',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'A shimmering tonic that replenishes a small amount of mana.',
    effect: { mp: 20 },
    cost: {},
    price: { gold: 0, silver: 10, copper: 0 }
};

export const greaterManaTonic: BattleOption = {
    id: 'potion-greater-mana-tonic',
    icon: '/inventory_icons/halfBottle_icon.png',
    title: 'Greater Mana Tonic',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'An improved version of the standard tonic, restoring significant mana.',
    effect: { mp: 50 },
    cost: {},
    price: { gold: 0, silver: 25, copper: 0 }
};

export const rejuvenationElixir: BattleOption = {
    id: 'potion-rejuvenation-elixir',
    icon: '/inventory_icons/halfBottle_icon.png',
    title: 'Rejuvenation Elixir',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'A balanced elixir that restores both health and mana moderately.',
    effect: { hp: 25, mp: 25 },
    cost: {},
    price: { gold: 0, silver: 0, copper: 10 }
};

export const elixirOfVigor: BattleOption = {
    id: 'potion-elixir-of-vigor',
    icon: '/inventory_icons/halfBottle_icon.png',
    title: 'Elixir of Vigor',
    type: 'potion',
    battleOptionType: 'potion',
    description: 'An invigorating brew that surges the drinker with temporary strength and vitality.',
    effect: { hp: 40 },
    cost: {},
    price: { gold: 0, silver: 0, copper: 25 }
};


export const allPotions: BattleOption[] = [
    minorHealingPotion,
    majorHealingPotion,
    manaTonic,
    greaterManaTonic,
    rejuvenationElixir,
    elixirOfVigor,
];  