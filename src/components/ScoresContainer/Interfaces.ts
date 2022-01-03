import { Tile } from "../Interfaces";

export type ACTIONTYPE = { type: "change"; payload: Tile[] };

export interface ScoresState {
  score: number;
  newPoints: number;
  tiles: Tile[];
}