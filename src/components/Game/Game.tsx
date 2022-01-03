import React, { useContext, useEffect, useReducer } from "react";
import GameContainer from "../GameContainer";
import Board from "../Board";

import "./Game.scss";
import {
  areEqual,
  createRandomTile,
  generateBoard,
  merge,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../../utils/gameUtils";
import GameHeader from "../GameHeader";
import {
  GameContextActionType,
  GameState,
  IGameContext,
  MoveKeyCode,
  Tile,
} from "../Interfaces";

const GameContext = React.createContext<IGameContext>(null);

const initState = (tilesCount = 2): GameState => {
  return {
    tiles: generateBoard(tilesCount),
    moves: [],
    loading: false,
  };
};

function gameReducer(state: GameState, action: GameContextActionType) {
  switch (action.type) {
    case "restart": {
      return initState();
    }
    case "addMove": {
      return { ...state, moves: [...state.moves, action.payload] };
    }
    case "startMove": {
      return { ...state, moves: state.moves.slice(1), loading: true };
    }
    case "move": {
      return { ...state, tiles: action.payload };
    }
    case "endMove": {
      const tiles = action.payload
        ? [...action.payload, createRandomTile(action.payload)]
        : state.tiles;
      return { ...state, tiles, loading: false };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const GameProvider = (props) => {
  const [state, dispatch] = useReducer(gameReducer, initState());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        dispatch({ type: "addMove", payload: e.key as MoveKeyCode });
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  useEffect(() => {
    if (state.moves.length === 0 || state.loading) {
      return;
    }

    const move = MOVES[state.moves[0]];
    dispatch({ type: "startMove" });

    const nextTiles: Tile[] = move(state.tiles);
    if (areEqual(state.tiles, nextTiles)) {
      dispatch({ type: "endMove" });
      return;
    }

    dispatch({ type: "move", payload: nextTiles });
    setTimeout(() => {
      dispatch({
        type: "endMove",
        payload: merge(nextTiles),
      });
    }, 100);

    // TODO: Should clear timeouts
  }, [state]);

  return (
    <GameContext.Provider value={{ tiles: state.tiles, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

const Game = () => {
  return (
    <GameProvider>
      <GameContainer>
        <GameHeader />
        <Board />
      </GameContainer>
    </GameProvider>
  );
};

const MOVES = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowRight: moveRight,
  ArrowLeft: moveLeft,
};

function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}

export { Game, useGameContext };
