import { Opponent } from '@/types/battle';
import { slash } from './attacks';

export const goblin: Opponent = {
  id: 'bandit-leader',
  avatar: '/opponent_avatars/goblin_avatar.png',
  name: 'Bandit Leader',
  hp: 20,
  mp: 30,
  attacks: [slash],
};
