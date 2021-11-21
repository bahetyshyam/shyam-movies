import React, { useContext, useReducer } from "react";
import { darkThemePalette, lightThemePalette } from "../constants";
import { ThemeActionKind, ThemeType } from "../enums";
type ThemeContextType = {
  theme: ThemeState;
  setTheme: React.Dispatch<ThemeAction>;
};

type ThemeAction =
  | {
      type: ThemeActionKind.CHANGE_THEME_DARK;
    }
  | {
      type: ThemeActionKind.CHANGE_THEME_LIGHT;
    };

const INITIAL_STATE: ThemeState = {
  currentTheme: ThemeType.Light,
  themePalette: lightThemePalette,
};

const contextDefaultValues: ThemeContextType = {
  theme: INITIAL_STATE,
  setTheme: () => {},
};
const ThemeContext =
  React.createContext<ThemeContextType>(contextDefaultValues);

export function useTheme() {
  return useContext(ThemeContext);
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionKind.CHANGE_THEME_DARK:
      return {
        ...state,
        currentTheme: ThemeType.Dark,
        themePalette: darkThemePalette,
      };
    case ThemeActionKind.CHANGE_THEME_LIGHT:
      return {
        ...state,
        currentTheme: ThemeType.Light,
        themePalette: lightThemePalette,
      };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useReducer(
    themeReducer,
    contextDefaultValues.theme
  );

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
