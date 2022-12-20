import { ThemeConfig } from "types/ThemeConfig";
import { lightColors, darkColors } from "./colors";

const logoHeight = "50px";

export const lightTheme: ThemeConfig = {
  styles: { colors: lightColors, logoHeight },
  strings: {},
  brand: {},
  nav: {
    primary: [],
    secondary: [],
  },
};

export const darkTheme: ThemeConfig = {
  styles: { colors: darkColors, logoHeight },
  strings: {},
  brand: {},
  nav: {
    primary: [],
    secondary: [],
  },
};
