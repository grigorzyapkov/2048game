import React, { useEffect, useReducer } from "react";
import { MOVES_MAP } from "../../utils/boardUtils";
import { useGameContext } from "../Game/Game";
import { GameState } from "../interfaces";
import Board from "./Board";

import "./Board.scss";
import { BoardActionType, BoardState } from "./Interfaces";

export const BoardProvider = () => {
  const { gameState } = useGameContext();

  const [boardState, dispatch] = useReducer(boardReducer, initState());
  
  useEffect(() => {
    dispatch({ type: "addMove", payload: gameState });
  }, [gameState]);

  useEffect(() => {
    if (boardState.moves.length < 2 || boardState.loading) {
      return;
    }

    dispatch({ type: "startMove" });

    setTimeout(() => {
      dispatch({
        type: "endMove",
      });
    }, 100);

  }, [boardState]);

  return <Board tiles={boardState.tiles} />;
};

function boardReducer(state: BoardState, action: BoardActionType): BoardState {
  switch (action.type) {
    case "addMove": {
      const isNewGame = !action.payload.lastMove;
      if (isNewGame || state.tiles.length === 0) {
        return initState(action.payload);
      }

      return {
        ...state,
        moves: [...state.moves, action.payload],
      };
    }
    case "startMove": {
      const currGameState = state.moves[0];
      const nextGameState = state.moves[1];
      const tiles = MOVES_MAP[nextGameState.lastMove](currGameState.tiles);

      return { ...state, loading: true, tiles };
    }
    case "endMove": {
      const nextGameState = state.moves[1];
      return {
        moves: state.moves.slice(1),
        loading: false,
        tiles: nextGameState.tiles,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const initState = (gameState?: GameState): BoardState => {
  if (gameState) {
    return { moves: [gameState], loading: false, tiles: gameState.tiles };
  }
  return { moves: [], loading: false, tiles: [] };
};
