import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "../Game/Game";

import "./ScoresContainer.scss";

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
  const { score } = useContext(GameContext);
  const prevScore = usePrevious(score);

  useEffect(() => {

    if (score === prevScore) {
      return;
    }
    const diff = score - prevScore;
    const div = document.createElement("div");
    div.id = "additionScore";
    div.classList.add("addScore");
    div.innerText = `+${diff}`;

    const currentScoreBox = document.getElementById("currentScoreBox");
    if (currentScoreBox.childElementCount === 2) {
      currentScoreBox.replaceChild(div, currentScoreBox.lastChild);
    }else {
      currentScoreBox.appendChild(div);
    }
  }, [score, prevScore]);

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

const usePrevious = (value: number): number => {
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
