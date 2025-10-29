import { Character } from '@/types/character';

const characterOptions: Character[] = [
  {
    id: 'char-1',
    name: 'Barbosa',
    avatar: '/character_avatars/barbarian_avatar2.png',
    hp: 100,
    mp: 50,
  },
  {
    id: 'char-2',
    name: 'Durgan',
    avatar: '/character_avatars/dwarf_avatar2.png',
    hp: 110,
    mp: 40,
  },
  {
    id: 'char-3',
    name: 'Perrin',
    avatar: '/character_avatars/paladin_avatar2.png',
    hp: 90,
    mp: 60,
  },
  {
    id: 'char-4',
    name: 'Hobbin',
    avatar: '/character_avatars/halfling_avatar2.png',
    hp: 85,
    mp: 55,
  },
  {
    id: 'char-5',
    name: 'Nereza',
    avatar: '/character_avatars/necromancer_avatar2.png',
    hp: 70,
    mp: 100,
  },
  {
    id: 'char-6',
    name: 'Seryn',
    avatar: '/character_avatars/snowElf_avatar2.png',
    hp: 80,
    mp: 90,
  },
];

export default characterOptions;
