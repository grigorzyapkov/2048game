import React, { useEffect, useState } from "react";
import GameContainer from "../GameContainer";
import Board from "../Board";

import "./Game.scss";
import {
  areEqual,
  generateBoard,
  generateTile,
  merge,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../../utils/gameUtils";
import GameHeader from "../GameHeader";
import { IGameContext, Tile } from "../Interfaces";

export const GameContext = React.createContext<IGameContext>(null);

const MOVES = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowRight: moveRight,
  ArrowLeft: moveLeft,
};

export const Game = () => {
  const [tiles, setTiles] = useState<Tile[]>(generateBoard());
  const [score, setScore] = useState<number>(0);
  const [addScore, setAddScore] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const move = MOVES[e.key];
      if (!move) {
        return;
      }

      const newTiles: Tile[] = move(tiles);
      if (areEqual(tiles, newTiles)) {
        console.log("equal");
        return;
      }

      setTiles(newTiles);

      setTimeout(() => {
        const [merged, moveScore] = merge(newTiles);

        setTiles(merged);
        setScore(score + moveScore);
        setAddScore(moveScore);

        setTimeout(() => {
          setTiles([...merged, generateTile(merged)]);
        }, 150);
      }, 100);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [tiles, score]);

  const handleRestart = () => {
    setTiles([]);
    setTimeout(() => {
      setTiles(generateBoard());
    }, 100);
    setScore(0);
  };

  return (
    <GameContext.Provider
      value={{
        tiles: tiles,
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