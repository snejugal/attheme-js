import test from "ava";
import Attheme from "../lib";

test(`Fallbacks to other themes`, t => {
  const COLOR_A = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  };
  const COLOR_B = {
    red: 100,
    green: 100,
    blue: 100,
    alpha: 100,
  };
  const COLOR_C = {
    red: 200,
    green: 200,
    blue: 200,
    alpha: 200,
  };
  const WALLPAPER = `wallpaper`;

  const fallbackTo = new Attheme([[`foo`, COLOR_A], [`bar`, COLOR_B]]);
  fallbackTo.setWallpaper(WALLPAPER);

  const fallbacking = new Attheme([[`foo`, COLOR_C]]);
  fallbacking.fallbackToOther(fallbackTo);

  const expected = new Attheme([[`foo`, COLOR_C], [`bar`, COLOR_B]]);
  expected.setWallpaper(WALLPAPER);

  t.deepEqual(fallbacking, expected);
});

test(`Wallpaper-related methods work correctly`, t => {
  const theme = new Attheme();
  const wallpaper = `pretending`;

  t.false(theme.hasWallpaper());
  t.is(theme.getWallpaper(), null);

  theme.setWallpaper(wallpaper);
  t.true(theme.hasWallpaper());
  t.is(theme.getWallpaper(), wallpaper);

  theme.deleteWallpaper();
  t.false(theme.hasWallpaper());
  t.is(theme.getWallpaper(), null);

  const wallpaperFromContentsTheme = new Attheme(`WPS\n${wallpaper}\nWPE`);

  t.true(wallpaperFromContentsTheme.hasWallpaper());
  t.is(wallpaperFromContentsTheme.getWallpaper(), wallpaper);
});

test(`Variables-related methods work correctly`, t => {
  const theme = new Attheme();

  const variable = `foo`;
  const color = {
    red: 0x10,
    green: 0x20,
    blue: 0x30,
    alpha: 0x40,
  };

  t.false(theme.has(variable));
  t.is(theme.get(variable), null);

  theme.set(variable, color);
  t.true(theme.has(variable));
  t.deepEqual(theme.get(variable), color);

  theme.delete(variable);
  t.false(theme.has(variable));
  t.is(theme.get(variable), null);
});

test(`getVariablesAmount works correctly`, t => {
  const theme = new Attheme(`foo=-1`);

  t.is(theme.getVariablesAmount(), 1);

  theme.set(`bar`, {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  });

  t.is(theme.getVariablesAmount(), 2);

  theme.delete(`foo`);
  t.is(theme.getVariablesAmount(), 1);
});

test(`getVariablesList works correctly`, t => {
  const theme = new Attheme(`foo=-1`);

  t.deepEqual(theme.getVariablesList(), [`foo`]);

  theme.set(`bar`, {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  });

  t.deepEqual(theme.getVariablesList(), [`foo`, `bar`]);

  theme.delete(`foo`);
  t.deepEqual(theme.getVariablesList(), [`bar`]);
});

test(`sorts in places correctly`, t => {
  const theme = new Attheme([
    [`divider`, { red: 0, green: 0, blue: 0, alpha: 0 }],
    [`checkbox`, { red: 0, green: 0, blue: 0, alpha: 0 }],
  ]);

  theme.sort();

  const expected = new Attheme([
    [`checkbox`, { red: 0, green: 0, blue: 0, alpha: 0 }],
    [`divider`, { red: 0, green: 0, blue: 0, alpha: 0 }],
  ]);

  t.deepEqual(theme, expected);
});

test(`Iterator works correctly`, t => {
  const theme = new Attheme([
    [`foo`, { red: 0, green: 0, blue: 0, alpha: 0 }],
    [`bar`, { red: 0, green: 0, blue: 0, alpha: 1 }],
  ]);

  const variables = new Map(theme);

  t.deepEqual(variables, theme._variables);
});

test(`toString respects the colorSignature parameter`, t => {
  const theme = new Attheme([
    [`foo`, { red: 255, green: 255, blue: 255, alpha: 255 }],
  ]);

  const expectedHexOutput = `foo=#ffffffff\n`;
  const expectedIntOutput = `foo=-1\n`;

  t.is(theme.toString(`hex`), expectedHexOutput);
  t.is(theme.toString(`int`), expectedIntOutput);
});

test(`Copies color values`, t => {
  const color = { red: 0, green: 0, blue: 0, alpha: 0 };

  const theme = new Attheme();
  theme.set(`foo`, color);
  t.not(theme._variables.get(`foo`), color);
});
