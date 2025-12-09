import type { Equipment } from '@/types/character';

// Class-specific starter equipment
export const paladinStarterArmor: Equipment = {
    id: 'equipment-paladin-starter-armor',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Initiate Plate',
    type: 'equipment',
    description: 'Simple but polished plate armor issued to new paladins of the order.',
    effect: {
        hp: 10,
    },
};

export const elfStarterCloak: Equipment = {
    id: 'equipment-elf-starter-cloak',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Forestweave Cloak',
    type: 'equipment',
    description: 'A light, hooded cloak that helps elves blend into wooded paths.',
    effect: {
        hp: 10,
    },
};

export const halflingStarterVest: Equipment = {
    id: 'equipment-halfling-starter-vest',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Padded Travel Vest',
    type: 'equipment',
    description: 'A padded vest with many pockets, perfect for nimble halfling adventurers.',
    effect: {
        hp: 10,
    },
};

export const barbarianStarterHarness: Equipment = {
    id: 'equipment-barbarian-starter-harness',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Warg Hide Harness',
    type: 'equipment',
    description: 'Rough hide straps that offer minimal protection but maximum freedom of movement.',
    effect: {
        hp: 10,
    },
};

export const necromancerStarterRobe: Equipment = {
    id: 'equipment-necromancer-starter-robe',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Faded Gravecloth Robe',
    type: 'equipment',
    description: 'A tattered robe that smells faintly of grave soil and old incense.',
    effect: {
        hp: 10,
    },
};

export const dwarfStarterMail: Equipment = {
    id: 'equipment-dwarf-starter-mail',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Mining Chainshirt',
    type: 'equipment',
    description: 'A reinforced chainshirt once used in the mines to guard against cave-ins.',
    effect: {
        hp: 10,
    },
};

// General equipment usable by anyone
export const travelersCloak: Equipment = {
    id: 'equipment-travelers-cloak',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Traveler’s Cloak',
    type: 'equipment',
    description: 'A weathered cloak that keeps out wind, rain, and prying eyes.',
    effect: {
        hp: 10,
    },
};

export const leatherBracers: Equipment = {
    id: 'equipment-leather-bracers',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Leather Bracers',
    type: 'equipment',
    description: 'Simple bracers that offer a bit of extra protection to the forearms.',
    effect: {
        hp: 10,
    },
};

export const sturdyBoots: Equipment = {
    id: 'equipment-sturdy-boots',
    icon: '/inventory_icons/armor_icon.png',
    title: 'Sturdy Boots',
    type: 'equipment',
    description: 'Well-worn boots built for long marches across rough terrain.',
    effect: {
        hp: 10,
    },
};
