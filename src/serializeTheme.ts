import Attheme from ".";
import { Color, ColorSignature } from "./types";

const serializeColor = (
  color: Color,
  colorSignature: ColorSignature,
): string => {
  const red = color.red.toString(16).padStart(2, `0`);
  const green = color.green.toString(16).padStart(2, `0`);
  const blue = color.blue.toString(16).padStart(2, `0`);
  const alpha = color.alpha.toString(16).padStart(2, `0`);
  const hex = `${alpha}${red}${green}${blue}`;

  if (colorSignature === `hex`) {
    return `#${hex}`;
  }

  return String(Number.parseInt(hex, 16) << 0);
};

const serializeTheme = (
  theme: Attheme,
  colorSignature: ColorSignature = `hex`,
): string => {
  let result = ``;

  for (const [variable, color] of theme) {
    const hex = serializeColor(color, colorSignature);

    result += `${variable}=${hex}\n`;
  }

  if (theme.hasWallpaper()) {
    result += `\nWPS\n${theme.getWallpaper()}\nWPE\n`;
  }

  return result;
};

export default serializeTheme;
