import { atom } from "jotai";
import { theme } from "theme.config";

export { lightColors } from "./colors/light";
export { darkColors } from "./colors/dark";
export default atom(theme);
