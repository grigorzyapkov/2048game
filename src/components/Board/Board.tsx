import React, { useContext } from "react";
import { isGameOver } from "../../utils/gameUtils";
import Button from "../Button";
import { GameContext } from "../Game/Game";
import { BoardValue } from "../Game/Interfaces";
import Tile from "../Tile";

import "./Board.scss";

const BoardContainer = (props: { children: React.ReactNode }) => {
  return <div className="boardContainer">{props.children}</div>;
};

const GameOverLayer = () => {
  const { handleRestart } = useContext(GameContext);

  return (
    <div id="gameOverContainer" className="gameOverContainer">
      <p>Game Over!</p>
      <Button onClick={handleRestart}>Try again</Button>
    </div>
  );
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

const TilesList = (props: { values: BoardValue[] }) => {
  return (
    <>
      {props.values.map((x) => (
        <Tile key={x.id} value={x.value} x={x.positionY} y={x.positionX} />
      ))}
    </>
  );
};

const TileContainer = () => {
  const { boardState } = useContext(GameContext);

  const values = boardState
    .reduce((prev, curr) => {
      return [...prev, ...curr.filter((x) => x !== null)];
    }, [])
    .sort((a, b) => a.id - b.id);

  return (
    <div className="tileContainer">
      <TilesList values={values} />
    </div>
  );
};

export const Board = () => {

  const { boardState } = useContext(GameContext);

  return (
    <BoardContainer>
      {isGameOver(boardState) && <GameOverLayer />}
      <BoardGrid />
      <TileContainer />
    </BoardContainer>
  );
};
