import { Character } from '@/lib/features/character/CharacterSlice';

const characterOptions: Character[] = [
  {
    characterId: 'char-1',
    characterName: 'Barbosa',
    avatar: '/character_avatars/barbarian_avatar.png',
    hp: 100,
    mp: 50,
  },
  {
    characterId: 'char-2',
    characterName: 'Durgan',
    avatar: '/character_avatars/dwarf_avatar.png',
    hp: 110,
    mp: 40,
  },
  {
    characterId: 'char-3',
    characterName: 'Perrin',
    avatar: '/character_avatars/paladin_avatar.png',
    hp: 90,
    mp: 60,
  },
  {
    characterId: 'char-4',
    characterName: 'Hobbin',
    avatar: '/character_avatars/halfling_avatar.png',
    hp: 85,
    mp: 55,
  },
  {
    characterId: 'char-5',
    characterName: 'Nereza',
    avatar: '/character_avatars/necromancer_avatar.png',
    hp: 70,
    mp: 100,
  },
  {
    characterId: 'char-6',
    characterName: 'Seryn',
    avatar: '/character_avatars/snowElf_avatar.png',
    hp: 80,
    mp: 90,
  },
];

export default characterOptions;
