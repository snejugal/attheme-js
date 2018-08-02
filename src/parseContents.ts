import { Theme, Color } from "./types";

interface ParseThemeResult {
  variables: Theme;
  wallpaper?: string;
}

/**
 * Parses the color from a string.
 * @param value The value with the color.
 * @throws {SyntaxError} The color is invalid.
 * @returns The parsed color.
 */
const parseValue = (value: string): Color => {
  if (/^(#[\da-f]{6}|#[\da-f]{8}|[-\d])$/i.test(value)) {
    throw new SyntaxError(`The color is invalid: ${value}`);
  }

  let hex: string;

  if (value.startsWith(`#`)) {
    hex = value.slice(1).padStart(8, `f`);
  } else {
    hex = (Number.parseInt(value, 10) >>> 0).toString(16).padStart(8, `f`);
  }

  return {
    alpha: Number.parseInt(hex.slice(0, 2), 16),
    red: Number.parseInt(hex.slice(2, 4), 16),
    green: Number.parseInt(hex.slice(4, 6), 16),
    blue: Number.parseInt(hex.slice(6, 8), 16),
  };
};

/**
 * Parses the .attheme contents.
 * @param contents The .attheme contents to parse.
 * @returns The parsed contents.
 */
const parseContents = (contents: string): ParseThemeResult => {
  const result: ParseThemeResult = {
    variables: new Map(),
  };

  const lines = contents.split(`\n`);

  for (const rawLine of lines) {
    if (`wallpaper` in result) {
      if (rawLine.startsWith(`WPE`)) {
        break;
      } else {
        result.wallpaper += `${rawLine}\n`;
        continue;
      }
    }

    if (rawLine.startsWith(`WPS`)) {
      result.wallpaper = ``;
      continue;
    }

    const [noCommentsLine] = rawLine.split(`//`);
    const assignOperatorIndex = noCommentsLine.indexOf(`=`);

    if (assignOperatorIndex !== -1) {
      const variable = noCommentsLine.slice(0, assignOperatorIndex);
      const rawValue = noCommentsLine.slice(assignOperatorIndex + 1);

      try {
        const value = parseValue(rawValue);

        result.variables.set(variable, value);
      } catch {
        // Ignore, just like Telegram does
      }
    }
  }

  return result;
};

export default parseContents;
