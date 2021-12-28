import React, { useContext } from "react";
import Button from "../Button";
import { GameContext } from "../Game/Game";
import ScoresContainer from "../ScoresContainer";

import "./GameHeader.scss";

const GameTitle = () => <span className="gameTitle">2048</span>;

const ShortDescription = () => {
  return (
    <div>
      <span>Join the tiles, get to 2048!</span>
      <br />
      <a href="#id">How to play →</a>
    </div>
  );
};

export const GameHeader = () => {
  const { handleRestart } = useContext(GameContext);

  return (
    <div className="header">
      <div className="centeredText">
        <GameTitle />
        <ShortDescription />
      </div>
      <div className="actions">
        <ScoresContainer />
        <Button id="restartGameBtn" onClick={(_) => handleRestart()}>
          New Game
        </Button>
      </div>
    </div>
  );
};
