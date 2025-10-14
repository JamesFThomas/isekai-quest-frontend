export interface Opponent {
  id: string;
  name: string;
  hp: number;
  mp: number;
  attackIds: string[]; // Available attacks
}{ actorId: action.payload.actorId, targetId: action.payload.targetId }