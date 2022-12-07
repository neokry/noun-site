import { NavigationItem } from "./NavigationItem";
import { ThemeColors } from "./ThemeColors";

export type ThemeConfig = {
  styles: {
    color?: ThemeColors;
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
