import React, { useEffect } from "react";
import useGameLocalStorage from "../../hooks/useLocalStorage";
import { getMaxId } from "../../utils/boardUtils";
import { useGameContext } from "../Game/Game";
import { Tile } from "../interfaces";
import ScoreBox from "../ScoreBox";
import { ACTIONTYPE, ScoresState } from "./Interfaces";

import "./ScoresContainer.scss";

export const ScoresContainer = () => {
  const { gameState } = useGameContext();

  const [state, dispatch] = useGameLocalStorage(
    "scores",
    initState(),
    stateReducer
  );

  useEffect(() => {
    dispatch({ type: "change", payload: gameState.tiles });
  }, [gameState.tiles, dispatch]);

  useEffect(() => {
    if (state.newPoints > 0) {
      const oldAddScore = document.getElementById("additionScore");
      oldAddScore.innerText = `+${state.newPoints}`;
      const newAddScore = oldAddScore.cloneNode(true);
      oldAddScore.parentNode.replaceChild(newAddScore, oldAddScore);
    }
  }, [state]);

  return (
    <div className="scoresContainer">
      <div style={{ position: "relative" }}>
        <ScoreBox title="SCORE" score={state.score} />
        <div className="addScore" id="additionScore"></div>
      </div>

      <ScoreBox title="BEST" score={state.bestScore} />
    </div>
  );
};

const initState = (tiles: Tile[] = []): ScoresState => {
  return {
    score: 0,
    newPoints: 0,
    bestScore: 0,
    tiles,
  };
};

const containsTile = (tiles: Tile[], tile: Tile): boolean => {
  return tiles.some((t) => t.id === tile.id);
};

const stateReducer = (state: ScoresState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "change": {
      const tiles = action.payload;

      // handles page refresh
      if (
        state.tiles.length === tiles.length &&
        state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return state;
      }

      // handles restart
      if (
        tiles.length === 2 &&
        [1, 2].every((id) => tiles.find((tile) => tile.id === id)) &&
        !state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return { ...initState(tiles), bestScore: state.bestScore };
      }

      // handles add new tile
      if (
        state.tiles.every((t) => containsTile(tiles, t)) &&
        tiles.length === state.tiles.length + 1
      ) {
        return { ...state, tiles: tiles, newPoints: 0 };
      }

      // handles merge
      const lastGeneratedTileId = getMaxId(tiles);
      const newPoints = tiles.reduce((acc: number, curr: Tile) => {
        const add =
          curr.id === lastGeneratedTileId || containsTile(state.tiles, curr)
            ? 0
            : curr.value;
        return acc + add;
      }, 0);

      const score = state.score + newPoints;
      const bestScore = Math.max(score, state.bestScore);

      return { tiles, newPoints, score, bestScore };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
