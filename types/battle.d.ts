type BattlePhase = null | 'idle' | 'chooseAction' | 'resolving' | 'result';

type BattleResult = null | 'win' | 'lose' | 'flee';

export type BattleActionDetails = {
  id: string;
  title: string;
  type: string;
}

export interface Opponent {
  id: string;
  name: string;
  avatar: string,
  hp: number;
  mp: number;
  attackIds: string[]; // Available attacks
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
  src: string;
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

export const initialTestState: BattleState = {
  battleId: "test-001",
  activeCharacter: {
    id: "char-1",
    name: "Adele the Dev",
    avatar: "/character_avatars/paladin_avatar2.png",
    hp: 30,
    mp: 10,
    attacks: ["basic-attack", "heavy-swing", "quick-stab", "power-strike", "mighty-blow", "sneak-attack"],
    equippedWeapon: "wooden-sword",
    skills: [],
    inventory: {
      potions: ["small-health-potion", "small-mana-potion", "antidote", "small-health-potion", "small-health-potion"],
    }
  },
  activeOpponent: {
    id: "opp-1",
    name: "Training Dummy",
    avatar: '/opponent_avatars/goblin_avatar.png',
    hp: 25,
    mp: 0,
    attackIds: ["bonk"],
  },
  isPlayerTurn: true,
  battleLog: [],
  phase: "chooseAction",
  result: null,
  round: 1
};