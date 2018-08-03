import test from "ava";
import Attheme from "../../lib/";
import themeToObject from "../../lib/tools/themeToObject";

test(`Converts the new theme type to the old one correctly`, (t) => {
  const contents = `
foo=-1

WPS
pretending there's a wallpaper
WPE
`;

  const newTheme = new Attheme(contents);
  const oldThemeExpected = {
    foo: {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    },
    [Symbol.for(`image`)]: `pretending there's a wallpaper`,
  };

  t.deepEqual(themeToObject(newTheme), oldThemeExpected);
});
