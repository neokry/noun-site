import { useAtom } from "jotai";
import themeAtom from "theme";

export const useTheme = () => {
  return useAtom(themeAtom);
};
