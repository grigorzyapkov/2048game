export type Value = "2" | "4" | "8" | "16" | "32" | "64" | "128" | "256" | "512" | "1024" | "2048";

export type TransformFactor = 121 | 97 | 73;

export type Direction = "right" | "left";

export interface Tile {
  id: number;
  value: Value;
  positionX: number;
  positionY: number;
}

export interface IGameContext {
  score: number;
  addScore: number;
  tiles: Tile[];
  handleRestart: () => void;
}