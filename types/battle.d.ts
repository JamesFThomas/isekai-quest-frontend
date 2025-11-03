type BattlePhase = null | 'idle' | 'chooseAction' | 'resolving' | 'result';

type BattleResult = null | 'win' | 'lose' | 'flee';

export type BattleActionDetails = {
  id: string;
  title: string;
  type: string;
}

export interface BattleState // battleSlice initial state shape (typo/casing fixes)
{
  battleId: string | null,
  activeCharacter: Character | null,   // fixed: activeCharater → activeCharacter
  activeOpponent: Opponent | null,    // fixed: activeOpenent → activeOpponent
  isPlayerTurn: boolean,
  battleLog: string[],                  // fixed: battlelog → battleLog
  phase?: BattlePhase,
  result: BattleResult,
  round?: number | null
}

export interface BattleOption {
  id: string;
  icon: string;
  title: string;
  type: string;
  effect: number;
  cost?: number;
}

export interface BattleAction {
  actorId: string;
  targetId: string;
  details: BattleActionDetails;
  effects: {
    hp?: number,
    mp?: number
  }
  cost?: {
    hp?: number,
    mp?: number
  }
}

export interface Opponent {
  id: string;
  name: string;
  avatar: string,
  hp: number;
  mp: number;
  attacks: BattleOption[]; // Available attacks
}

const testAttack: BattleOption = {
  id: "basic-attack",
  icon: "/battle_actions/basic-attack.png",
  title: "Basic Attack",
  type: "attack",
  effect: { hp: -7 }
};

const testOpponentAttack: BattleOption = {
  id: "bonk",
  icon: "/battle_actions/bonk.png",
  title: "Bonk",
  type: "attack",
  effect: { hp: -4 }
};

const testSkill: BattleOption = {
  id: "evade attack",
  icon: "/battle_actions/evade-attack.png",
  title: "Evade Attack",
  type: "skill",
  effect: { mp: -2 }
};

const testPotion: BattleOption = {
  id: "small-health-potion",
  icon: "/battle_actions/small-health-potion.png",
  title: "Health Potion/S",
  type: "potion",
  effect: { hp: +3 }
};

export const initialTestState: BattleState = {
  battleId: "test-001",
  activeCharacter: {
    id: "char-1",
    name: "Adele the Dev",
    avatar: "/character_avatars/paladin_avatar2.png",
    hp: 30,
    mp: 10,
    attacks: [testAttack],
    equippedWeapon: "wooden-sword",
    skills: [testSkill],
    inventory: {
      potions: [testPotion],
    }
  },
  activeOpponent: {
    id: "opp-1",
    name: "Training Dummy",
    avatar: '/opponent_avatars/goblin_avatar.png',
    hp: 25,
    mp: 0,
    attacks: [testOpponentAttack],
  },
  isPlayerTurn: true,
  battleLog: [],
  phase: "chooseAction",
  result: null,
  round: 1
};