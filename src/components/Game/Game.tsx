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
import { IGameContext, MoveKeyCode, Tile } from "../Interfaces";

export const GameContext = React.createContext<IGameContext>(null);

export const Game = () => {
  const { tiles, registerMove, restartGame } = useGameState();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        registerMove(e.key as MoveKeyCode);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [registerMove]);

  return (
    <GameContext.Provider
      value={{
        tiles,
        restartGame,
      }}
    >
      <GameContainer>
        <GameHeader />
        <Board />
      </GameContainer>
    </GameContext.Provider>
  );
};

const MOVES = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowRight: moveRight,
  ArrowLeft: moveLeft,
};

const useGameState = (): {
  tiles: Tile[];
  registerMove: (move: MoveKeyCode) => void;
  restartGame: () => void;
} => {
  const [moves, setMoves] = useState<MoveKeyCode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Tile[]>(generateBoard());

  useEffect(() => {
    if (moves.length === 0 || loading) {
      return;
    }

    const move = MOVES[moves[0]];
    setMoves(moves.slice(1));
    setLoading(true);

    const nextTiles: Tile[] = move(tiles);
    if (areEqual(tiles, nextTiles)) {
      setLoading(false);
      return;
    }

    setTiles(nextTiles);
    setTimeout(() => {
      const merged = merge(nextTiles);
      setTiles(merged);

      setTimeout(() => {
        const tiles = [...merged, generateTile(merged)];
        setTiles(tiles);
        setLoading(false);
      }, 0);
    }, 100);

    // TODO: Should clear timeouts
  }, [moves, loading, tiles]);

  const restartGame = () => {
    setTiles(generateBoard());
  };

  const registerMove = (move: MoveKeyCode) => {
    setMoves([...moves, move]);
  };

  return { tiles, registerMove, restartGame };
};
