import { ThemeConfig } from "types/ThemeConfig";
import { defaultTheme } from "theme/default";

export const theme: ThemeConfig = {
  ...defaultTheme,
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
};
