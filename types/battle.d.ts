export interface Opponent {
  id: string;
  name: string;
  avatar: string,
  hp: number;
  mp: number;
  attackIds: string[]; // Available attacks
}