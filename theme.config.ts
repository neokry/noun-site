import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme, darkTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Londrina Solid",
    },
    colors: {
      "text-highlighted": "138, 97, 208",
      backdrop: "255, 248, 241",
      fill: "250, 237, 225",
      muted: "247, 240, 233",
    },
  },
  brand: {
    logo: null,
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
      {
        label: "Farcaster",
        href: "https://fcast.me/purple",
      },
    ],
    secondary: [
      { label: "Discord", href: "https://discord.gg/58YJDJ5G" },
      {
        label: "Etherscan",
        href: "https://etherscan.io/address/0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60",
      },
      { label: "Farcaster", href: "https://fcast.me/purple" },
    ],
  },
} as Partial<ThemeConfig>);
