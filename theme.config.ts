import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Roboto",
    },
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
      { label: "About", href: "/about" },
    ],
    secondary: [],
  },
} as Partial<ThemeConfig>);
