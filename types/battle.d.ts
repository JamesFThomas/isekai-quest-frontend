export interface Opponent {
  opponentId: string;
  name: string;
  hp: number;
  mp: number;
  attackIds: string[]; // Available attacks
}