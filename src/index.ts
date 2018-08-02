import checkType from "./checkType";

interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

type Theme = Map<string, Color>;

interface Options {
  defaultValues?: Theme;
}

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

class Attheme {
  private _variables: Theme;
  private _wallpaper: string;

  /**
   * Constructs a new theme.
   * @param contents The .attheme contents to parse.
   * @param options Additional options for constructing the theme.
   * @param options.defaultValues Values that the constructor fill fallback to
   * if not present in the parsed theme.
   * @throws The contents is syntactically invalid.
   */
  constructor(contents?: string | null, options: Options = {}) {
    checkType({
      variable: contents,
      types: [`string`],
      functionName: `new Attheme()`,
      argumentName: `content`,
    });

    checkType({
      variable: options,
      types: [`object`],
      functionName: `new Attheme()`,
      argumentName: `options`,
    });

    this._variables = new Map();

    if (options !== null) {
      checkType({
        variable: options.defaultValues,
        types: [Map],
        functionName: `new Attheme()`,
        argumentName: `options.defaultValues`,
      });

      if (
        options.defaultValues !== null
        && options.defaultValues !== undefined
      ) {
        for (const [variable, value] of options.defaultValues) {
          this._variables.set(variable, value);
        }
      }
    }
  }
}

export default Attheme;

export {
  Theme,
};
