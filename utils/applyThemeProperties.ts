import { ThemeConfig } from "types/ThemeConfig";

export const applyThemeProperties = (theme: ThemeConfig) => {
  if (!theme.styles.colors) return;

  const root = document.documentElement;
  Object.entries(theme.styles.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  if (theme.styles.fonts)
    Object.entries(theme.styles.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
};
