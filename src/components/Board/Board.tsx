import React, { useContext, useEffect, useState } from "react";
import { ScreenSizeBreakpoint, TilesScreenTransformFactor } from "../../constants/constants";
import { isGameOver, merge } from "../../utils/gameUtils";
import Button from "../Button";
import { GameContext } from "../Game/Game";
import { Tile, TransformFactor } from "../Interfaces";
import BoardTile from "../BoardTile";

import "./Board.scss";

const BoardContainer = (props: { children: React.ReactNode }) => {
  return <div className="boardContainer">{props.children}</div>;
};

const GameOverContainer = () => {
  const { restartGame: handleRestart } = useContext(GameContext);

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

const calcFactor = () => {
  if(window.innerWidth <= ScreenSizeBreakpoint.XS){
    return TilesScreenTransformFactor.XS;
  }
  if(window.innerWidth <= ScreenSizeBreakpoint.S){
    return TilesScreenTransformFactor.S;
  }

  return TilesScreenTransformFactor.M;
}

const TilesList = (props: { values: Tile[] }) => {
  const [factor, setFactor] = useState<TransformFactor>(calcFactor());

  useEffect(() => {
    const handleResize = () => {
      setFactor(calcFactor());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {props.values.map((x) => (
        <BoardTile
          key={x.id}
          value={x.value}
          x={x.positionY * factor}
          y={x.positionX * factor}
        />
      ))}
    </div>
  );
};

const TileContainer = () => {
  const { tiles } = useContext(GameContext);

  const values = tiles.sort((b1, b2) => b1.id - b2.id);
  return (
    <div className="tileContainer">
      <TilesList values={values} />
    </div>
  );
};

export const Board = () => {
  const { tiles } = useContext(GameContext);

  return (
    <BoardContainer>
      {isGameOver(merge(tiles)) && <GameOverContainer />}
      <BoardGrid />
      <TileContainer />
    </BoardContainer>
  );
};
