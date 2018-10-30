import Attheme from "..";
import { Color } from "../types";

const IMAGE_KEY = Symbol.for(`image`);

interface ObjectTheme {
  [key: string]: Color;
  [IMAGE_KEY]?: string;
}

/**
 * Converts the new Attheme instance into the old one compatible with the old
 * versions of attheme-js.
 * @param theme The new Attheme instance.
 * @returns An object compatible with the old versions of attheme-js.
 */
export default (theme: Attheme): ObjectTheme => {
  let object: ObjectTheme = {};

  for (const [variable, value] of theme) {
    if (variable === `__proto__`) {
      continue;
    }

    object[variable] = value;
  }

  if (theme.hasWallpaper()) {
    object[IMAGE_KEY] = theme.getWallpaper() as string;
  }

  return object;
};
