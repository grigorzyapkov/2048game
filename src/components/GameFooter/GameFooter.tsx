import React from "react";
import { isMobile } from "../../utils/utils";
import { SectionProps } from "./Interfaces";

const Section = (props: SectionProps) => {
  return (
    <div id={props.id}>
      <h4>{props.title}</h4>
      {props.children}
      {props.bottomSeparator ? <hr /> : null}
    </div>
  );
};

const GameRules = () => {
  const text = isMobile(navigator.userAgent || navigator.vendor)
    ? "Swipe with your fingers to move the numbers."
    : "Use your arrow keys to move the numbers.";

  return (
    <Section
      id="howToPlaySection"
      title="HOW TO PLAY"
      bottomSeparator
    >
      <p>
        {text} The same numbers will be merged
        into one when they touch. After each move, a new number (
        <strong>2</strong> or <strong>4</strong>) is generated at a random empty
        position. Merge the numbers and build a 2048 number to{" "}
        <strong>WIN</strong> the game!
      </p>
    </Section>
  );
};

const LearnMore = () => {
  return (
    <Section title="LEARN MORE">
      <p>
        This app is inspired by{" "}
        <a href="https://play2048.co/">https://play2048.co/</a>. If you want to
        learn more about the project tech stack or see the code, visit the&nbsp;
        <a
          href="https://github.com/grigorzyapkov/2048game"
          target="_blank"
          rel="noreferrer"
        >
          Github repository
        </a>
        .
      </p>
    </Section>
  );
};

export const GameFooter = () => {
  return (
    <div>
      <GameRules />
      <LearnMore />
    </div>
  );
};
