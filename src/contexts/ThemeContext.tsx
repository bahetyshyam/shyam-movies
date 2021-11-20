import React, { useContext, useReducer } from "react";
import { ActionKind, ThemeType } from "../enums";
type ThemeContextType = {
  theme: ThemeState;
  setTheme: React.Dispatch<ThemeAction>;
};

type ThemeAction =
  | {
      type: ActionKind.CHANGE_THEME_DARK;
    }
  | {
      type: ActionKind.CHANGE_THEME_LIGHT;
    };

const darkThemePalette: ThemePalette = {
  themePrimary: "#0078d4",
  themeLighterAlt: "#eff6fc",
  themeLighter: "#deecf9",
  themeLight: "#c7e0f4",
  themeTertiary: "#71afe5",
  themeSecondary: "#2b88d8",
  themeDarkAlt: "#106ebe",
  themeDark: "#005a9e",
  themeDarker: "#004578",
  neutralLighterAlt: "#0d0b0b",
  neutralLighter: "#171414",
  neutralLight: "#272222",
  neutralQuaternaryAlt: "#312b2b",
  neutralQuaternary: "#393232",
  neutralTertiaryAlt: "#5b5252",
  neutralTertiary: "#aba9a7",
  neutralSecondary: "#8f8d8c",
  neutralPrimaryAlt: "#737270",
  neutralPrimary: "#fffcfa",
  neutralDark: "#3b3a39",
  black: "#1f1e1e",
  white: "#030202",
};

const lightThemePalette: ThemePalette = {
  themePrimary: "#0085C2",
  themeLighterAlt: "#f2f9fd",
  themeLighter: "#cee9f5",
  themeLight: "#a6d6ed",
  themeTertiary: "#57b1da",
  themeSecondary: "#1891c9",
  themeDarkAlt: "#0077ae",
  themeDark: "#006593",
  themeDarker: "#004a6d",
  neutralLighterAlt: "#faf9f8",
  neutralLighter: "#f3f2f1",
  neutralLight: "#edebe9",
  neutralQuaternaryAlt: "#e1dfdd",
  neutralQuaternary: "#d0d0d0",
  neutralTertiaryAlt: "#c8c6c4",
  neutralTertiary: "#a19f9d",
  neutralSecondary: "#605e5c",
  neutralPrimaryAlt: "#3b3a39",
  neutralPrimary: "#323130",
  neutralDark: "#201f1e",
  black: "#000000",
  white: "#ffffff",
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
    case ActionKind.CHANGE_THEME_DARK:
      return {
        ...state,
        currentTheme: ThemeType.Dark,
        themePalette: darkThemePalette,
      };
    case ActionKind.CHANGE_THEME_LIGHT:
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
