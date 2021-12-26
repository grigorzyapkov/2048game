import React from "react";

import "./GameContainer.css";

interface GameContainerProps {
  children: React.ReactNode;
}

export const GameContainer = (props: GameContainerProps) => {
  return <div className="container">{props.children}</div>
}