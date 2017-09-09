"use strict";

class Attheme {
  constructor(theme = "", defaultValues) {
    if (!theme) {
      theme = "";
    }
    theme = Attheme._parseText(theme);

    if (defaultValues) {
      let defaults;

      if (typeof defaultValues == "object") {
        defaults = defaultValues;
      } else {
        throw new Error("`defaultValues` is not an object");
      }

      for (let variable in defaults) {
        theme[variable] = defaults[variable];
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
    const b16 = (n) => n.toString(16).padStart(2, "0");
    const b10 = (n) => parseInt(n, 16);
    let text = "";

    for (let variable in theme) {
      const red = b16(theme[variable].red);
      const green = b16(theme[variable].green);
      const blue = b16(theme[variable].blue);
      const alpha = b16(theme[variable].alpha);
      const hex = `#${(alpha == "ff") ? "" : alpha}${red}${green}${blue}`;
      const int = (b10(`${alpha}${red}${green}${blue}`) << 0).toString();

      let value;

      if (!shorthand || shorthand == "auto") {
        if (hex.length >= int.length) {
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

      text += `${variable}=${value}\n`;
    }

    if (theme[Attheme.IMAGE_KEY]) {
      text += `WPS\n${theme[Attheme.IMAGE_KEY]}\nWPE\n`;
    }

    return text;
  }

  static _parseText(theme = "") {
    if (typeof theme != "string") {
      throw new Error("Attheme.parseText requires a string");
      return;
    }

    const b16 = (n) => n.toString(16).padStart(2, "0"),
      b10 = (n) => parseInt(n, 16);

    const lines = theme.split("\n");
    let themeObject = {};

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (~line.indexOf("//")) {
        line = line.split("//")[0];
      }
      line = line.trim();

      if (line == "WPS") {
        themeObject[Attheme.IMAGE_KEY] = lines.slice(i + 1, -2).join("\n");
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
      themeObject[variable] = color;
    }

    return themeObject;
  }

  static get IMAGE_KEY() {
    return Symbol.for("image");
  }
};

module.exports = Attheme;