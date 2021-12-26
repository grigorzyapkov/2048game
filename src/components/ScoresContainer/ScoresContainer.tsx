import React, { useContext, useEffect } from "react";
import { GameContext } from "../Game/Game";

import "./ScoresContainer.css";

interface ScoreBoxProps {
  title: string;
  score: number;
  showAddition?: boolean;
}

const ScoreBox = (props: ScoreBoxProps) => {
  useEffect(() => {}, [props.showAddition]);

  return (
    <div className="scoreBox">
      <span className="title">{props.title}</span>
      <span className="score">{props.score}</span>
    </div>
  );
};

export const ScoresContainer = () => {
  const { score, addScore } = useContext(GameContext);

  useEffect(() => {
    if (addScore === 0) {
      return;
    }
    const div = document.createElement("div");
    div.id = "additionScore";
    div.classList.add("addScore");
    div.innerText = `+${addScore}`;

    const currentScoreBox = document.getElementById("currentScoreBox");
    if (currentScoreBox.childElementCount === 2) {
      currentScoreBox.replaceChild(div, currentScoreBox.lastChild);
    }else {
      currentScoreBox.appendChild(div);
    }
  }, [score, addScore]);

  return (
    <div className="scoresContainer">
      <div id="currentScoreBox" style={{ position: "relative" }}>
        <ScoreBox title="SCORE" score={score} />
        {/* <div id="additionScore" className="addScore">{`+${addScore}`}</div> */}
      </div>

      <ScoreBox title="BEST" score={score} />
    </div>
  );
};
