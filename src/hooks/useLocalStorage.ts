import React, { useEffect, useReducer } from "react";

const GAME_ID = "2048game";

const useStateReducer = (prevState, newState) => {
  return typeof newState === "function" ? newState(prevState) : newState;
};

const getInitialValue = (key: string, defaultValue: any) => {
  try {
    const gameState = JSON.parse(window.localStorage.getItem(GAME_ID));
    const value = gameState?.[key];
    return value ?? defaultValue;
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

function useGameLocalStorage<T>(
  key: string,
  defaultValue: T,
  reducer = useStateReducer
): [T, React.Dispatch<any>] {
  const [value, dispatch] = useReducer(
    reducer,
    getInitialValue(key, defaultValue)
  );

  useEffect(() => {
    let state = JSON.parse(window.localStorage.getItem(GAME_ID)) || {};
    state[key] = value;
    window.localStorage.setItem(GAME_ID, JSON.stringify(state));
  }, [value, key]);

  return [value, dispatch];
}

export default useGameLocalStorage;
