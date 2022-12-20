import { ThemeColors } from "types/ThemeConfig/ThemeColors";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";

const withRGB = (val: string): `${string}, ${string}, ${string}` => {
  val = val.replace("#", "");
  const match = val.match(/.{1,2}/g)!;
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `${r}, ${g}, ${b}`;
};

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme!.colors as any;
console.log("colors", withRGB(colors.gray["900"]));

export const lightColors: ThemeColors = {
  fill: withRGB(colors.gray["100"]),
  muted: withRGB(colors.gray["100"]),
  stroke: withRGB(colors.gray["300"]),
  backdrop: "256, 256, 256",
  "text-base": withRGB(colors.gray["900"]),
  "text-muted": withRGB(colors.gray["500"]),
  "text-inverted": "256, 256, 256",
  "text-highlighted": withRGB(colors.blue["500"]),
  "button-accent": withRGB(colors.gray["900"]),
  "button-accent-hover": withRGB(colors.gray["700"]),
  "button-muted": withRGB(colors.gray["300"]),
  "proposal-success": withRGB(colors.green["600"]),
  "proposal-danger": withRGB(colors.red["600"]),
  "proposal-muted": withRGB(colors.neutral["500"]),
  "proposal-highlighted": withRGB(colors.blue["600"]),
};

export const darkColors: ThemeColors = {
  fill: "2, 4, 8",
  muted: withRGB(colors.neutral["800"]),
  stroke: withRGB(colors.neutral["700"]),
  backdrop: withRGB(colors.neutral["900"]),
  "text-base": "256, 256, 256",
  "text-muted": withRGB(colors.neutral["400"]),
  "text-inverted": "2, 4, 8",
  "text-highlighted": "256, 256, 256",
  "button-accent": "256, 256, 256",
  "button-accent-hover": withRGB(colors.neutral["200"]),
  "button-muted": withRGB(colors.neutral["400"]),
  "proposal-success": withRGB(colors.green["600"]),
  "proposal-danger": withRGB(colors.red["600"]),
  "proposal-muted": withRGB(colors.neutral["500"]),
  "proposal-highlighted": withRGB(colors.blue["600"]),
};
