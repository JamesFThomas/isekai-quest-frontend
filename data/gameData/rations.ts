import type { Ration } from '@/types/character';

export const driedRations: Ration = {
    id: 'ration-dried-rations',
    icon: '/inventory_icons/ration_icon.png',
    title: 'Dried Rations',
    type: 'ration',
    description: 'A mix of dried meat and hardtack. Restores a small amount of energy on the road.',
    effect: {
        hp: 5,
        mp: 1
    },
    cost: { mp: 0 },
};

export const heartyStew: Ration = {
    id: 'ration-hearty-stew',
    icon: '/inventory_icons/ration_icon.png',
    title: 'Hearty Camp Stew',
    type: 'ration',
    description: 'A warm stew of root vegetables and meat, perfect for restoring strength after battle.',
    effect: {
        hp: 10,
        mp: 2
    },
    cost: { mp: 0 },
};

export const sweetTrailMix: Ration = {
    id: 'ration-sweet-trail-mix',
    icon: '/inventory_icons/ration_icon.png',
    title: 'Sweet Trail Mix',
    type: 'ration',
    description: 'Nuts, dried fruit, and honeyed seeds that give a quick burst of energy.',
    effect: {
        hp: 8,
        mp: 3
    },
    cost: { mp: 0 },
};

export const waybreadLoaf: Ration = {
    id: 'ration-waybread-loaf',
    icon: '/inventory_icons/ration_icon.png',
    title: 'Waybread Loaf',
    type: 'ration',
    description: 'Dense, enchanted bread that stays fresh for weeks and fills the stomach quickly.',
    effect: {
        hp: 12,
        mp: 5
    },
    cost: { mp: 0 },
};
