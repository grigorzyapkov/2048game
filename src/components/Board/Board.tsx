import React from "react";
import { isGameOver, isGameWon } from "../../utils/boardUtils";
import { Tile } from "../Interfaces";
import Tiles from "../Tiles";
import GameResult from "./GameResult";
import { GameStatus } from "./Interfaces";

const getGameStatus = (tiles: Tile[]): GameStatus => {
  if (isGameWon(tiles)) {
    return "WIN";
  }
  if (isGameOver(tiles)) {
    return "GAME_OVER";
  }

  return "IN_PROGRESS";
};

const BoardGrid = () => {
  const grid = Array.from(Array(4).keys()).map((rowId) => {
    const columns = Array.from(Array(4).keys()).map((colId) => (
      <div key={colId} className="cell"></div>
    ));
    return (
      <div key={rowId} className="row">
        {columns}
      </div>
    );
  });

  return <div className="gridContainer">{grid}</div>;
};

const Board = (props: { tiles: Tile[] }) => {
  const status = getGameStatus(props.tiles);

  return (
    <div id="boardContainer">
      {status !== "IN_PROGRESS" && <GameResult isWon={status === "WIN"} />}
      <BoardGrid />
      <Tiles tiles={props.tiles} />
    </div>
  );
};

export default Board;
