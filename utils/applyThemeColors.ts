import { ThemeConfig } from "types/ThemeConfig";

export const applyThemeColors = (theme: ThemeConfig) => {
  if (!theme.styles.color) return;

  const root = document.documentElement;
  Object.entries(theme.styles.color).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};
