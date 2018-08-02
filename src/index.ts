import checkType from "./checkType";
import { Theme, Color, ColorSignature } from "./types";
import parseContents from "./parseContents";
import checkColor from "./checkColor";
import serializeTheme from "./serializeTheme";

interface Options {
  defaultValues?: Theme;
}

class Attheme {
  private _variables: Theme = new Map();
  private _wallpaper: string;

  /**
   * Constructs a new theme.
   * @param contents The .attheme contents to parse.
   * @param options Additional options for constructing the theme.
   * @param options.defaultValues Values that the constructor fill fallback to
   * if not present in the parsed theme.
   * @throws {TypeError} If any of the provided arguments is of a wrong type.
   */
  constructor(contents?: string | null, options: Options | null = {}) {
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
          this.setVariable(variable, value);
        }
      }
    }

    const { variables, wallpaper } = parseContents(contents as string);

    for (const [variable, value] of variables) {
      // this.setVariable dynamically checks types, but here they are
      // guarantred to be valid, and all that type checking will only slow
      // down this loop.
      this._variables.set(variable, value);
    }

    if (typeof wallpaper === `string`) {
      this._wallpaper = wallpaper;
    }
  }

  getWallpaper() {
    return this._wallpaper;
  }

  setWallpaper(newWallpaper: string) {
    checkType({
      variable: newWallpaper,
      types: [`string`],
      functionName: `attheme.setWallpaper`,
      argumentName: `newWallpaper`,
      nullOrUndefined: false,
    });

    this._wallpaper = newWallpaper;
  }

  hasWallpaper() {
    return this._wallpaper !== undefined;
  }

  deleteWallpaper() {
    delete this._wallpaper;
  }

  hasVariable(variable: string) {
    checkType({
      variable: variable,
      types: [`string`],
      functionName: `attheme.hasVariable`,
      argumentName: `variable`,
      nullOrUndefined: false,
    });

    return this._variables.has(variable);
  }

  deleteVariable(variable: string) {
    checkType({
      variable: variable,
      types: [`string`],
      functionName: `attheme.deleteVariable`,
      argumentName: `variable`,
      nullOrUndefined: false,
    });

    return this._variables.delete(variable);
  }

  getVariable(variable: string) {
    checkType({
      variable: variable,
      types: [`string`],
      functionName: `attheme.getVariable`,
      argumentName: `variable`,
      nullOrUndefined: false,
    });

    return this._variables.get(variable);
  }

  setVariable(variable: string, value: Color) {
    checkType({
      variable: variable,
      types: [`string`],
      functionName: `attheme.setVariable`,
      argumentName: `variable`,
      nullOrUndefined: false,
    });

    checkColor({
      color: value,
      functionName: `attheme.setVariable`,
      argumentName: `value`,
    });

    this._variables.set(variable, value);
  }

  getVariablesAmount() {
    return this._variables.size;
  }

  [Symbol.iterator]() {
    return this._variables.entries();
  }

  toString(colorSignature?: ColorSignature) {
    return serializeTheme(this, colorSignature);
  }
}

export default Attheme;
