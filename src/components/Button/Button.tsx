import React from "react";

import "./Button.scss"

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button id={props.id} className="appButton" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
