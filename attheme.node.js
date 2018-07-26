"use strict";

class Attheme {
  constructor(theme, fillWithDefaults) {
    if (!theme) {
      theme = "";
    }
    theme = Attheme._parseText(theme);

    if (fillWithDefaults) {
      let defaults;
      if (typeof fillWithDefaults == "object") {
        defaults = fillWithDefaults;
      } else if (window.defaultVariablesValues) {
        defaults = window.defaultVariablesValues;
      } else {
        throw new Error("`fillWithefaults` option is set to true, but `defaultVariablesValues` is not defined outside.\nIf defaults values are defined another way, pass them instead of `fillWithDefaults`");
      }

      for (let variable in defaults) {
        this[variable] = defaults[variable];
      }
    }
    for (let variable in theme) {
      this[variable] = theme[variable];
    }

    if (theme[Attheme.IMAGE_KEY]) {
      this[Attheme.IMAGE_KEY] = theme[Attheme.IMAGE_KEY];
    }
  }

  asText(shorthand) {
    return Attheme.asText(this, shorthand);
  }

  static asText(theme, shorthand) {
    const b16 = (number) => number.toString(16).padStart(2, "0"),
      b10 = (number) => parseInt(number, 16);

    let themeContent = "";

    for (let variable in theme) {
      const red = b16(theme[variable].red),
        green = b16(theme[variable].green),
        blue = b16(theme[variable].blue),
        alpha = b16(theme[variable].alpha),
        hex = `#${alpha == "ff" ? "" : alpha}${red}${green}${blue}`,
        int = (b10(`${alpha}${red}${green}${blue}`) << 0) + "";

      let value;

      if (!shorthand || shorthand == "auto") {
        if (hex.length > int.length) {
          value = int;
        } else {
          value = hex;
        }
      } else if (shorthand == "hex") {
        value = hex;
      } else if (shorthand == "int") {
        value = int;
      } else {
        throw new Error("The `shorthand` option value is invalid");
      }
      themeContent += `${variable}=${value}\n`;
    }

    if (theme[Attheme.IMAGE_KEY]) {
      themeContent += `WPS\n${theme[Attheme.IMAGE_KEY]}\nWPE\n`;
    }

    return themeContent;
  }

  static _parseText(themeContent = "") {
    if (typeof themeContent != "string") {
      throw new Error("Attheme.parseText requires a string");
      return;
    }

    const b16 = n => n.toString(16).padStart(2, "0"),
      b10 = n => parseInt(n, 16),
      lines = themeContent.split("\n");

    let theme = {};

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (~line.indexOf("//")) {
        line = line.split("//")[0];
      }
      line = line.trim();

      if (line == "WPS") {
        let wpeIndex = lines.indexOf(`WPE`);

        if (wpeIndex == -1) {
          wpeIndex = lines.length;
        }

        theme[Attheme.IMAGE_KEY] = lines.slice(i + 1, wpeIndex).join("\n");
        break;
      }

      if (!line || !/=/.test(line)) {
        continue;
      }

      const [variable, value] = line.split("=");
      let color = null;

      if (!value.startsWith("#")) {
        color = b16(parseInt(value) >>> 0).padStart(8, "0");
      } else {
        color = value.slice(1).padStart(8, "f");
      }

      color = {
        red: b10(color.slice(2, 4)),
        green: b10(color.slice(4, 6)),
        blue: b10(color.slice(6, 8)),
        alpha: b10(color.slice(0, 2))
      };
      theme[variable] = color;
    }
    return theme;
  }

  static get IMAGE_KEY() {
    return Symbol.for("image");
  }
}


module.exports = Attheme;
