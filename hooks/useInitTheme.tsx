import { applyThemeProperties } from "@/utils/applyThemeProperties";
import { useEffect } from "react";
import { useTheme } from "./useTheme";

export const useInitTheme = () => {
  const [theme] = useTheme();

  useEffect(() => {
    applyThemeProperties(theme);
  }, [theme]);
};
