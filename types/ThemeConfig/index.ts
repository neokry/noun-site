import { NavigationItem } from "./NavigationItem";
import { ThemeColors } from "./ThemeColors";
import { ThemeFonts } from "./ThemeFonts";

export type ThemeConfig = {
  styles: {
    colors?: ThemeColors;
    fonts?: ThemeFonts;
  };
  strings: {
    currentBid?: string;
    auctionEndsIn?: string;
    placeBid?: string;
    highestBidder?: string;
    connectWallet?: string;
  };
  brand: {
    logo?: string | null;
    title?: string | null;
  };
  nav: {
    primary: NavigationItem[];
    secondary: NavigationItem[];
  };
};
