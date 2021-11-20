import React from "react";
import { ThemeProvider as FluentUIThemeProvider } from "@fluentui/react";
import GlobalStyle from "../../globalStyles";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";

const GlobalTheme: React.FC = ({ children }) => {
  const { theme } = useTheme();
  return (
    <FluentUIThemeProvider
      theme={{
        defaultFontStyle: {
          fontFamily: "Roboto, sans-serif",
          fontWeight: "regular",
        },
        palette: theme.themePalette,
      }}
    >
      <StyledComponentsThemeProvider theme={theme.themePalette}>
        <GlobalStyle />
        {children}
      </StyledComponentsThemeProvider>
    </FluentUIThemeProvider>
  );
};

export default GlobalTheme;
