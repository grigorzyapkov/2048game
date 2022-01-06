import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";

const DATA = {
  "WIN": {
    message: "Congratulations! You Win!",
    buttonText: "Play again",
    containerClass: "gameResultWin"
  },
  "LOSE": {
    message: "Game Over!",
    buttonText: "Try again",
    containerClass: "gameResultLose"
  }
}

const GameResult = (props: {isWon: boolean}) => {
  const { dispatch } = useGameContext();

  const {message, buttonText, containerClass} = props.isWon ? DATA.WIN : DATA.LOSE;

  return (
    <div className={`gameResult ${containerClass}`}>
      <p>{message}</p>
      <Button onClick={(_) => dispatch({ type: "restart" })}>{buttonText}</Button>
    </div>
  );
};

export default GameResult;