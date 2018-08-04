import checkType from "./checkType";
import { Theme, Color, ColorSignature, AtthemeOptions } from "./types";
import parseContents from "./parseContents";
import checkColor from "./checkColor";
import serializeTheme from "./serializeTheme";

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
  constructor(contents: string | null = ``, options: AtthemeOptions | null = {}) {
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

    if (typeof contents === `string`) {
      const { variables, wallpaper } = parseContents(contents);

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
  }

  /**
   * Gets the theme's wallpaper.
   * @returns The theme's wallpaper.
   */
  getWallpaper() {
    return this._wallpaper;
  }

  /**
   * Sets the new wallpaper.
   * @param newWallpaper The new wallpaper.
   */
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

  /**
   * Checks whether the theme has a wallpaper.
   * @returns Whether the theme has a wallpaper.
   */
  hasWallpaper() {
    return this._wallpaper !== undefined;
  }

  /**
   * Deletes the wallpaper.
   */
  deleteWallpaper() {
    delete this._wallpaper;
  }

  /**
   * Checks whether the theme has the specified variables.
   * @param variable The varialbe to check existence of.
   * @returns Whehter the theme has the variable.
   */
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

  /**
   * Deletes the variable.
   * @param variable The variable to delete.
   */
  deleteVariable(variable: string) {
    checkType({
      variable: variable,
      types: [`string`],
      functionName: `attheme.deleteVariable`,
      argumentName: `variable`,
      nullOrUndefined: false,
    });

    this._variables.delete(variable);
  }

  /**
   * Gets the value of the specified variable.
   * @param variable The variable to get value of.
   * @returns The value of the variable.
   */
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

  /**
   * Sets the variable to the specified value.
   * @param variable The variable to set.
   * @param value The value of the variable.
   */
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

  /**
   * Gets the amount of variables in the theme.
   * @returns The amount of variable in the theme.
   */
  getVariablesAmount() {
    return this._variables.size;
  }

  /**
   * Gets an array of all variables in the theme.
   * @returns An array of varialbes.
   */
  getVariablesList() {
    return [...this._variables.keys()];
  }

  [Symbol.iterator]() {
    return this._variables.entries();
  }

  /**
   * Serialized the theme.
   * @param colorSignature The way the colors should be serialized. hex" for
   * #aarrggbb and "int" for Java int color.
   * @returns The serialized theme.
   */
  toString(colorSignature?: ColorSignature) {
    return serializeTheme(this, colorSignature);
  }
}

export default Attheme;
