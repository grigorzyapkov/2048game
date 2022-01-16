import React, { useContext, useEffect } from "react";
import Board from "../Board";

import "./Game.scss";
import {
  areEqual,
  createRandomTile,
  generateBoard,
  merge,
  MOVES_MAP,
} from "../../utils/boardUtils";
import GameHeader from "../GameHeader";
import {
  GameContextActionType,
  GameState,
  IGameContext,
  Direction,
  Tile,
} from "../Interfaces";
import GameFooter from "../GameFooter";
import useGameLocalStorage from "../../hooks/useLocalStorage";
import { KEYBOARD_ARROW_TO_DIRECTION_MAP } from "../../constants/constants";

const GameContext = React.createContext<IGameContext>(null);

const initState = (tilesCount = 2): GameState => {
  return {
    tiles: generateBoard(tilesCount),
    lastMove: null,
  };
};

function gameReducer(state: GameState, action: GameContextActionType) {
  switch (action.type) {
    case "restart": {
      return initState();
    }
    case "move": {
      const move = MOVES_MAP[action.payload];
      let tiles: Tile[] = move(state.tiles);
      if (areEqual(state.tiles, tiles)) {
        return state;
      }

      tiles = merge(tiles);
      return {
        tiles: [...tiles, createRandomTile(tiles)],
        lastMove: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const GameProvider = (props) => {
  const [state, dispatch] = useGameLocalStorage(
    "game",
    initState(),
    gameReducer
  );
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const direction: Direction | undefined =
        KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key];
      if (direction) {
        dispatch({ type: "move", payload: direction });
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  return (
    <GameContext.Provider value={{ gameState: state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

const Game = () => {
  return (
    <GameProvider>
      <div className="container">
        <div className="gameContainer">
          <GameHeader />
          <Board />
        </div>
        <GameFooter />
      </div>
    </GameProvider>
  );
};

function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}

export { Game, useGameContext };
