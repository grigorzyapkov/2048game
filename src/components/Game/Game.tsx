import React, { useEffect, useState } from "react";
import GameContainer from "../GameContainer";
import Board from "../Board";

import "./Game.scss";
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
import GameHeader from "../GameHeader";

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

      setTimeout(() => {
        const [mergedBoard, moveScore] = merge(newBoardState);

        setBoardState(mergedBoard);
        setScore(score + moveScore);
        setAddScore(moveScore);

        setTimeout(() => {
          const board = addRandomValue(mergedBoard);
          setBoardState(board);
        }, 150);
      }, 100);
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
        <Board />
      </GameContainer>
    </GameContext.Provider>
  );
};

const boardInitialState: BoardState = [
  { id: 1, value: "2", positionX: 0, positionY: 0 },
  { id: 2, value: "4", positionX: 0, positionY: 1 },
  { id: 3, value: "8", positionX: 0, positionY: 2 },
  { id: 4, value: "16", positionX: 0, positionY: 3 },
  { id: 5, value: "16", positionX: 1, positionY: 0 },
  { id: 6, value: "8", positionX: 1, positionY: 1 },
  { id: 7, value: "4", positionX: 1, positionY: 2 },
  { id: 8, value: "2", positionX: 1, positionY: 3 },
  { id: 9, value: "2", positionX: 2, positionY: 0 },
  { id: 10, value: "4", positionX: 2, positionY: 1 },
  { id: 11, value: "8", positionX: 2, positionY: 2 },
  { id: 12, value: "16", positionX: 2, positionY: 3 },
  { id: 13, value: "16", positionX: 3, positionY: 0 },
  { id: 14, value: "8", positionX: 3, positionY: 1 },
  { id: 15, value: "4", positionX: 3, positionY: 2 },
  { id: 16, value: "16", positionX: 3, positionY: 3 },
];
