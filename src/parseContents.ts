import { Theme } from "./types";

interface ParseThemeResult {
  variables: Theme;
  wallpaper?: string;
}

/**
 * Parses the .attheme contents.
 * @param content The .attheme contents to parse.
 */
const parseContents = (content: string): ParseThemeResult => {
  /** @todo: Write the parser */
  return {
    variables: new Map(),
  };
};

export default parseContents;
