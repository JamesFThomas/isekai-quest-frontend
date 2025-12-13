import { InventoryItemBase, EffectfulItem } from "./character"

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


export type BattleOptionType = 'attack' | 'skill' | 'potion'


export interface BattleOption extends InventoryItemBase {
  battleOptionType: BattleOptionType;
}

export interface BattleAction extends EffectfulItem {
  actorId: string;
  targetId: string;
  details: BattleActionDetails;
}

export interface Opponent {
  id: string;
  name: string;
  avatar: string,
  hp: number;
  mp: number;
  attacks: BattleOption[]; // Available attacks
}

