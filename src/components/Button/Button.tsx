import React from "react";

import "./Button.scss";

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
  const { id, children, className, onClick } = props;

  return (
    <button
      id={id}
      className={`appButton ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
