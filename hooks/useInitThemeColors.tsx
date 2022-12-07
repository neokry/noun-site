import { applyThemeColors } from "@/utils/applyThemeColors";
import { useEffect } from "react";
import { useTheme } from "./useTheme";

export const useInitThemeColors = () => {
  const [theme] = useTheme();

  useEffect(() => {
    applyThemeColors(theme);
  }, [theme]);
};
