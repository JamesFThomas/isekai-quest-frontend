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

export const unknownRider: Opponent = {
  id: 'unknown-rider',
  avatar: '/opponent_avatars/rider_avatar.png',
  name: 'Unknown Rider',
  hp: 25,
  mp: 35,
  attacks: [slash],
};
