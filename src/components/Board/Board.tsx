import React, { useEffect, useReducer } from "react";
import { isGameOver, isGameWon, MOVES_MAP } from "../../utils/gameUtils";
import { useGameContext } from "../Game/Game";
import { GameState, Tile } from "../Interfaces";
import Tiles from "../Tiles";

import "./Board.scss";
import GameResult from "./GameResult";
import { BoardActionType, BoardState, GameStatus } from "./Interfaces";

const getGameStatus = (tiles: Tile[]): GameStatus => {
  if (isGameWon(tiles)) {
    return "WIN";
  }
  if (isGameOver(tiles)) {
    return "GAME_OVER";
  }

  return "IN_PROGRESS";
};

const Board = (props: { tiles: Tile[] }) => {
  
  const status = getGameStatus(props.tiles);

  return (
    <div className="boardContainer">
      {status !== "IN_PROGRESS" && <GameResult isWon={status === "WIN"} />}
      <BoardGrid />
      <Tiles tiles={props.tiles} />
    </div>
  );
};

const BoardGrid = () => {
  const grid = Array.from(Array(4).keys()).map((rowId) => {
    const columns = Array.from(Array(4).keys()).map((colId) => (
      <div key={colId} className="cell"></div>
    ));
    return (
      <div key={rowId} className="row">
        {columns}
      </div>
    );
  });

  return <div className="gridContainer">{grid}</div>;
};

export const BoardContainer = () => {
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

    // TODO: Should clear timeouts
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
