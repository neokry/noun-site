import { ThemeConfig } from "types/ThemeConfig";
import { lightColors } from "./colors/light";
import { darkColors } from "./colors/dark";

export const lightTheme: ThemeConfig = {
  styles: { colors: lightColors },
  strings: {},
  brand: {},
  nav: {
    primary: [],
    secondary: [],
  },
};

export const darkTheme: ThemeConfig = {
  styles: { colors: darkColors },
  strings: {},
  brand: {},
  nav: {
    primary: [],
    secondary: [],
  },
};
