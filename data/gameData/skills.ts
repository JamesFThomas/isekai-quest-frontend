import { BattleOption } from "@/types/battle";

// General Skills
export const evade: BattleOption = {
    id: "general-evade",
    icon: "/battleaction_icons/evade_icon.png",
    title: "Evade",
    type: "skill",
    description: "Attempt to dodge the opponent's next attack, reducing or avoiding damage.",
    effect: {},
};

export const block: BattleOption = {
    id: "general-block",
    icon: "/battleaction_icons/block_icon.png", // placeholder, update later
    title: "Block",
    type: "skill",
    description: "Raise your guard to lessen the impact of the opponent's next attack.",
    effect: {},
};


// Paladin Skills
export const radiantPalm: BattleOption = {
    id: 'paladin-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Radiant Palm',
    type: 'skill',
    effect: {
        hp: -1,
    },
};

// Snow Elf Skills
export const iceGust: BattleOption = {
    id: 'snow-elf-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Ice Gust',
    type: 'skill',
    effect: {
        hp: -1,
    },
};

// Halfling Skills
export const luckyHook: BattleOption = {
    id: 'halfling-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Lucky Hook',
    type: 'skill',
    effect: {
        hp: -1,
    },
};

// Barbarian Skills
export const ragingSlam: BattleOption = {
    id: 'barbarian-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Raging Slam',
    type: 'skill',
    effect: {
        hp: -1,
    },
};

// Necromancer Skills
export const lifeSiphon: BattleOption = {
    id: 'necromancer-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Life Siphon',
    type: 'skill',
    effect: {
        hp: -1,
    },
};

// Dwarf Skills
export const earthshakerStomp: BattleOption = {
    id: 'dwarf-basic-skill',
    icon: "/battleaction_icons/sword_icon2.png",
    title: 'Earthshaker Stomp',
    type: 'skill',
    effect: {
        hp: -1,
    },
};
