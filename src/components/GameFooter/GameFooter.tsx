import React from "react";
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

const GameRules = (props: { bottomSeparator?: boolean }) => {
  return (
    <Section id="howToPlaySection" title="HOW TO PLAY" bottomSeparator={props.bottomSeparator}>
      <p>
        Use your arrow keys to move the numbers. The same numbers will be merged
        into one when they touch. After each move, a new number (<strong>2</strong> or <strong>4</strong>) is
        generated at a random empty position. Merge the numbers and
        build a 2048 number to <strong>WIN</strong> the game!
      </p>
    </Section>
  );
};

const LearnMore = (props: { bottomSeparator?: boolean }) => {
  return (
    <Section title="LEARN MORE" bottomSeparator={props.bottomSeparator}>
      <p>
        This app is inspired by{" "}
        <a href="https://play2048.co/">https://play2048.co/</a>. If you want to
        learn more about the project tech stack or see the code, visit the repository on&nbsp;
       <a href="https://github.com/grigorzyapkov/2048game" target="_blank" rel="noreferrer">Github</a>
      </p> 
    </Section>
  );
};

export const GameFooter = () => {
  return (
    <div>
      <GameRules />
      <hr />
      <LearnMore />
    </div>
  );
};
