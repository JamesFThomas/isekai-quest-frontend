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
  effect: {
    hp?: number,
    mp?: number
  };
  cost?: {
    hp?: number,
    mp?: number
  }
}

export interface BattleAction {
  actorId: string;
  targetId: string;
  details: BattleActionDetails;
  effect: {
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
