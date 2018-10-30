import test from "ava";
import serializeTheme from "../lib/serializeTheme";
import Attheme from "../lib";

test(`Serializes the theme correctly`, async (t) => {
  const theme = new Attheme();

  theme.set(`divider`, {
    red: 0xff,
    green: 0xff,
    blue: 0xff,
    alpha: 0xff,
  });

  const wallpaper = `it's my life
it's now or never
i ain't gonna live for ever
i just wanna live while i'm alive`;

  theme.setWallpaper(wallpaper);

  const expectedHexSerialization = `divider=#ffffffff

WPS
${wallpaper}
WPE
`;

  const expectedIntSerialization = `divider=-1

WPS
${wallpaper}
WPE
`;

  t.is(serializeTheme(theme, `hex`), expectedHexSerialization);
  t.is(serializeTheme(theme, `int`), expectedIntSerialization);
});
