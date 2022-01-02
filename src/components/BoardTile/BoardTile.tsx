import React, { memo } from "react";
import { Value } from "../Interfaces";

import "./BoardTile.scss";

interface TileProps {
  value: Value;
  x: number;
  y: number;
}

export const BoardTile = memo((props: TileProps) => {

  return (
    <div
      className={`tile tile-${props.value}`}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <div className="tileInner">{props.value}</div>
    </div>
  );
});
