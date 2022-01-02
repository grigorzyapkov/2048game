import React, { useContext, useEffect, useReducer } from "react";
import { getMaxId } from "../../utils/gameUtils";
import { GameContext } from "../Game/Game";
import { Tile } from "../Interfaces";
import { ACTIONTYPE, ScoreBoxProps, ScoresState } from "./Interfaces";

import "./ScoresContainer.scss";

const ScoreBox = (props: ScoreBoxProps) => {
  return (
    <div className="scoreBox">
      <span className="title">{props.title}</span>
      <span className="score">{props.score}</span>
    </div>
  );
};

export const ScoresContainer = () => {
  const { tiles } = useContext(GameContext);
  const [state, dispatch] = useReducer(stateReducer, initState(tiles));

  useEffect(() => {
    dispatch({ type: "change", payload: tiles });
  }, [tiles]);

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

      <ScoreBox title="BEST" score={state.score} />
    </div>
  );
};

const initState = (tiles: Tile[]): ScoresState => {
  return {
    score: 0,
    newPoints: 0,
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

      // handles restart
      if (
        tiles.length === 2 &&
        [1, 2].every((id) => tiles.find((tile) => tile.id === id)) &&
        !state.tiles.every((t) => containsTile(tiles, t))
      ) {
        return initState(tiles);
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
            : parseInt(curr.value);
        return acc + add;
      }, 0);

      return {
        tiles: tiles,
        newPoints,
        score: state.score + newPoints,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
