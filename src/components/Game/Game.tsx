import React, { useContext, useEffect, useState } from "react";
import GameContainer from "../GameContainer";
import ScoresContainer from "../ScoresContainer";
import Board from "../Board";

import "./Game.css";
import { BoardState, IGameContext } from "./Interfaces";
import {
  addRandomValue,
  areEqual,
  merge,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../../utils/gameUtils";
import Button from "../Button";

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

const GameHeader = () => {
  const { handleRestart } = useContext(GameContext);

  return (
    <div className="header">
      <div className="flex">
        <GameTitle />
        <ScoresContainer />
      </div>
      <div className="flexWithSpaceBetween">
        <ShortDescription />
        <Button onClick={(_) => handleRestart()}>New Game</Button>
      </div>
    </div>
  );
};

export const GameContext = React.createContext<IGameContext>(null);

const MOVES = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowRight: moveRight,
  ArrowLeft: moveLeft,
};

export const Game = () => {
  const [boardState, setBoardState] = useState<BoardState>([
    ...boardInitialState,
  ]);
  const [score, setScore] = useState<number>(0);
  const [addScore, setAddScore] = useState<number>(0);

  const handleGenerate = () => {
    setBoardState(addRandomValue(boardState));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const move = MOVES[e.key];
      if (!move) {
        return;
      }

      const newBoardState: BoardState = move(boardState);
      if (areEqual(boardState, newBoardState)) {
        console.log("equal");
        return;
      }

      setBoardState(newBoardState);

      requestAnimationFrame(() => {
        const [mergedBoard, moveScore] = merge(newBoardState);
        setBoardState(mergedBoard);
        setScore(score + moveScore);
        setAddScore(moveScore);

        setTimeout(() => {
          const board = addRandomValue(mergedBoard);
          setBoardState(board);
        }, 50);
      });
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [boardState, score]);

  const handleRestart = () => {
    setBoardState([]);
    setTimeout(() => {
      setBoardState([...boardInitialState]);
    }, 100);
    setScore(0);
  };

  return (
    <GameContext.Provider
      value={{
        boardState,
        score,
        addScore,
        handleRestart,
      }}
    >
      <GameContainer>
        <GameHeader />
        <Button onClick={handleGenerate}>Generate Tile</Button>
        <Board />
      </GameContainer>
    </GameContext.Provider>
  );
};

const boardInitialState: BoardState = [
  { id: 1, value: "2", positionX: 1, positionY: 0 },
  { id: 2, value: "2", positionX: 1, positionY: 1 },
  { id: 3, value: "2", positionX: 1, positionY: 2 },
  { id: 4, value: "2", positionX: 2, positionY: 1 },
];
