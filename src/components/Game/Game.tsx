import React, { useContext, useEffect, useState } from "react";
import GameContainer from "../GameContainer";
import ScoresContainer from "../ScoresContainer";
import Board from "../Board";

import "./Game.css";
import { BoardStateType, IGameContext } from "./Interfaces";
import {
  areEqual,
  getNextId,
  merge,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../../utils/gameUtils";
import { Value } from "../interfaces/interfaces";
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
  // TODO: test to see if ... spread needed
  const [boardState, setBoardState] = useState<BoardStateType>([
    ...boardInitialState,
  ]);
  const [score, setScore] = useState<number>(0);
  const [addScore, setAddScore] = useState<number>(0);

  const handleGenerate = () => {
    setBoardState(addRandomNumber(boardState));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const move = MOVES[e.key];
      if (!move) {
        return;
      }

      const newBoardState: BoardStateType = move(boardState);
      if (areEqual(boardState, newBoardState)) {
        return;
      }
      
      console.log("after move", newBoardState);
      setBoardState(newBoardState);

      setTimeout(() => {
        const [mergedBoard, moveScore] = merge(newBoardState);
        console.log("after merge", mergedBoard);
        setBoardState(mergedBoard);
        setScore(score + moveScore);
        setAddScore(moveScore);

        setTimeout(() => {
          const board = addRandomNumber(mergedBoard);
          console.log("after random number", board);
          setBoardState(board);
        }, 100);
      }, 0);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [boardState, score]);

  const handleRestart = () => {
    setBoardState(boardEmptyState);
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

const boardInitialState: BoardStateType = [
  [null, null, null, null],
  [null, null, { id: 1, value: "2", positionX: 1, positionY: 2 }, null],
  [null, { id: 2, value: "2", positionX: 2, positionY: 1 }, null, null],
  [null, null, null, null],
];

const boardEmptyState: BoardStateType = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const addRandomNumber = (boardState: BoardStateType): BoardStateType => {
  const number: Value = Math.random() <= 0.2 ? "4" : "2";
  const result = JSON.parse(JSON.stringify(boardState));

  const id = getNextId(result);

  const emptyPositions = result.reduce((prev, curr) => {
    return prev + curr.filter((x) => x === null).length;
  }, 0);
  const position = Math.floor(Math.random() * emptyPositions) + 1;
  let currentEmptyPosition = 0;

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      if (result[i][j] === null) {
        currentEmptyPosition++;
      }

      if (currentEmptyPosition === position) {
        result[i][j] = { id: id, value: number, positionX: i, positionY: j };
        return result;
      }
    }
  }

  return result;
};
