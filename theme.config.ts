import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme, darkTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(darkTheme, {
  styles: {
    fonts: {
      heading: "Times New Roman",
      body: "Times New Roman",
    },
    colors: {
      "text-highlighted": "254, 148, 226",
    },
  },
  brand: {
    logo: "/public.png",
    title: null,
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
      { label: "Reading", href: "/reading" },
    ],
    secondary: [
      { label: "Forum", href: "https://forum.public---assembly.com/" },
      {
        label: "Twitter",
        href: "https://twitter.com/pblcasmbly",
      },
      { label: "Github", href: "https://github.com/public-assembly" },
      { label: "Docs", href: "https://docs.public---assembly.com/" },
    ],
  },
} as Partial<ThemeConfig>);
