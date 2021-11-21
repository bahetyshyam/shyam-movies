import { Toggle } from "@fluentui/react";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeActionKind, ThemeType } from "../../enums";

interface ThemeToggleProps {}

const ThemeToggle: React.FunctionComponent<ThemeToggleProps> = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked) {
      setTheme({ type: ThemeActionKind.CHANGE_THEME_DARK });
    } else {
      setTheme({ type: ThemeActionKind.CHANGE_THEME_LIGHT });
    }
  };

  return (
    <Toggle
      label="Dark Theme"
      onText="On"
      offText="Off"
      onChange={handleThemeChange}
      checked={theme.currentTheme === ThemeType.Dark ? true : false}
    />
  );
};

export default ThemeToggle;
