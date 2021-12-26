import React from "react";
import { Value } from "../interfaces/interfaces";

import "./Tile.scss";

interface TileProps {
  value: Value;
  x: number;
  y: number;
}

export const Tile = (props: TileProps) => {
  const translateX = 121 * props.x;
  const translateY = 121 * props.y;

  return (
    <div
      className={`tile tile-${props.value}`}
      style={{ transform: `translate(${translateX}px, ${translateY}px)` }}
    >
      <div className="tileInner">{props.value}</div>
    </div>
  );
};
