import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";

const GameOver = () => {
  const { dispatch } = useGameContext();

  return (
    <div id="gameOverContainer" className="gameOverContainer">
      <p>Game Over!</p>
      <Button onClick={(_) => dispatch({ type: "restart" })}>Try again</Button>
    </div>
  );
};

export default GameOver;