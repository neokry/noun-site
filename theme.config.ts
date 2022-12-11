import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme, darkTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    colors: {
      "text-highlighted": "0, 133, 255",
    },
  },
  brand: {
    logo: "/builder.svg",
  },
  nav: {
    primary: [
      { label: "DAO", href: "/vote" },
      {
        label: "Docs",
        href: "https://docs.zora.co/docs/smart-contracts/nouns-builder/intro",
      },
      { label: "About", href: "/about" },
    ],
    secondary: [
      { label: "Twitter", href: "https://twitter.com/nounsbuilder" },
      {
        label: "Etherscan",
        href: "https://etherscan.io/address/0xdf9b7d26c8fc806b1ae6273684556761ff02d422",
      },
      { label: "Zora", href: "https://zora.co/" },
      { label: "Nouns", href: "https://nouns.wtf/" },
    ],
  },
} as Partial<ThemeConfig>);
