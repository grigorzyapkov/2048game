import React from "react";
import { Value } from "../interfaces/interfaces";

import "./Tile.scss";

interface TileProps {
  value: Value;
  x: number;
  y: number;
}

export const Tile = (props: TileProps) => {

  return (
    <div
      className={`tile tile-${props.value}`}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <div className="tileInner">{props.value}</div>
    </div>
  );
};
