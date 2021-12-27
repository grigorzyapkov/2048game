import { Value } from "../interfaces/interfaces";

export interface BoardValue {
  id: number;
  value: Value;
  positionX: number;
  positionY: number;
}

export type BoardState = BoardValue[];

export interface IGameContext {
  score: number;
  addScore: number;
  boardState: BoardState;
  handleRestart: () => void;
}

export type Direction = "right" | "left";
