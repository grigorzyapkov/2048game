import { Value } from "../interfaces/interfaces";

export interface BoardValue {
  id: number;
  value: Value;
  positionX: number;
  positionY: number;
}

export type BoardStateType = Array<Array<BoardValue | null>>;

export interface IGameContext {
  score: number;
  addScore: number;
  boardState: BoardStateType;
  handleRestart: () => void;
}
