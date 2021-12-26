import React from "react";

import "./Button.css"

interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className="appButton" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
