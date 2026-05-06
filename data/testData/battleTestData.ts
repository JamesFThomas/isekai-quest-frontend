import { BattleOption, BattleState } from '@/types/battle';
import { block, evade } from '../gameData/skills';
import {
  headButt,
  witherTouch,
  fistSmash,
  quickJab,
  forstPalm,
  holyJab,
} from '../gameData/attacks';
import { goblin } from '../gameData/opponents';

const testPotion: BattleOption = {
  id: 'small-health-potion',
  icon: '/battleaction_icons/potion_icon.png',
  title: 'Health Potion/S',
  description: 'a small helath potion recover 3 hp',
  type: 'potion',
  effect: { hp: +3 },
  battleOptionType: 'potion',
};

export const initialTestState: BattleState = {
  battleId: 'test-001',
  activeCharacter: {
    id: 'char-1',
    name: 'Adele the Dev',
    avatar: '/character_avatars/paladin_avatar2.png',
    hp: 30,
    mp: 10,
    inventory: {
      attacks: [headButt, witherTouch, fistSmash, quickJab, forstPalm, holyJab],
      skills: [evade, block],
      potions: [testPotion],
      weapons: [],
      equipment: [],
      rations: [],
      questItems: [],
      coins: { gold: 0, silver: 0, copper: 0 },
    },
  },
  activeOpponent: goblin,
  isPlayerTurn: true,
  battleLog: [],
  phase: 'chooseAction',
  result: null,
  round: 1,
  resolution: null,
  escapeAllowed: false,
  escapePenalty: null,
  reward: null,
};
