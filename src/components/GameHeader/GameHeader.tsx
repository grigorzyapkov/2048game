import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";
import ScoresContainer from "../ScoresContainer";

import "./GameHeader.scss";

const GameTitle = () => <span className="gameTitle">2048</span>;

const GameDescription = () => {
  return (
    <div>
      <span>Join the numbers to get <b>2048</b>!</span>
      <br />
      <a href="#howToPlaySection">How to play →</a>
    </div>
  );
};

export const GameHeader = () => {
  const { dispatch } = useGameContext();

  return (
    <div className="header">
      <div className="gameIntro">
        <GameTitle />
        <GameDescription />
      </div>
      <div className="actions">
        <ScoresContainer />
        <Button
          id="restartGameBtn"
          onClick={(_) => dispatch({ type: "restart" })}
        >
          New Game
        </Button>
      </div>
    </div>
  );
};
