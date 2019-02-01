import test from "ava";
import Attheme from "../lib";

test(`Checks types of arguments`, (t) => {
  t.notThrows(() => new Attheme());
  t.notThrows(() => new Attheme(``));
  t.notThrows(() => new Attheme(null));
  t.notThrows(() => new Attheme(undefined));
  t.notThrows(() => new Attheme(null, {}));
  t.notThrows(() => new Attheme(null, null));
  t.notThrows(() => new Attheme(null, undefined));

  t.notThrows(() => new Attheme(null, {
    defaultValues: undefined,
  }));

  t.notThrows(() => new Attheme(null, {
    defaultValues: undefined,
  }));

  t.notThrows(() => new Attheme(null, {
    defaultValues: null,
  }));

  t.notThrows(() => new Attheme(null, {
    defaultValues: new Map([
      [`variable`, {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
      }],
    ]),
  }));

  t.throws(() => new Attheme(1), TypeError);
  t.throws(() => new Attheme(Object(``)), TypeError);
  t.throws(() => new Attheme(null, 1), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: 1,
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [1, {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
      }],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, 1],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, 1],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, {
        red: -100,
        green: 0,
        blue: 0,
        alpha: 0,
      }],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, {
        red: 1000,
        green: 0,
        blue: 0,
        alpha: 0,
      }],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, {
        red: 100.5,
        green: 0,
        blue: 0,
        alpha: 0,
      }],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, {
        red: 100,
        green: 0,
        blue: 0,
      }],
    ]),
  }), TypeError);

  t.throws(() => new Attheme(null, {
    defaultValues: new Map([
      [`divider`, {
        red: 100,
        green: 0,
        blue: 0,
        alpha: 0,
        wtf: `??`,
      }],
    ]),
  }), TypeError);
});

test(`Fallbacks to defaultValues`, (t) => {
  const defaultValues = new Map([
    [`foo`, {
      red: 0x00,
      green: 0x10,
      blue: 0x30,
      alpha: 0x40,
    }],
    [`bar`, {
      red: 0x50,
      green: 0x60,
      blue: 0x70,
      alpha: 0x80,
    }],
  ]);

  const theme = new Attheme(`bar=-1`, { defaultValues });

  const expected = new Map([
    [`foo`, defaultValues.get(`foo`)],
    [`bar`, {
      red: 0xff,
      green: 0xff,
      blue: 0xff,
      alpha: 0xff,
    }],
  ]);

  t.deepEqual(theme._variables, expected);
});

test(`Wallpaper-related methods work correctly`, (t) => {
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

test(`Variables-related methods work correctly`, (t) => {
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

test(`getVariablesAmount works correctly`, (t) => {
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

test(`getVariablesList works correctly`, (t) => {
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

test(`sorts in places correctly`, (t) => {
  const theme = new Attheme(`
    divider=-1
    checbox=0
  `);

  theme.sort();

  t.deepEqual([...theme], [
    [`checkbox`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    }],
    [`divider`, {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    }],
  ])
});

test(`Iterator works correctly`, (t) => {
  const theme = new Attheme(`
foo=1
bar=2
`);

  const variables = new Map(theme);

  t.deepEqual(variables, theme._variables);
});

test(`toString respects the colorSignature parameter`, (t) => {
  const theme = new Attheme(`foo=#ffffff`);

  const expectedHexOutput = `foo=#ffffffff\n`;
  const expectedIntOutput = `foo=-1\n`;

  t.is(theme.toString(`hex`), expectedHexOutput);
  t.is(theme.toString(`int`), expectedIntOutput);
});

test(`Methods check argument types`, (t) => {
  const theme = new Attheme();

  t.notThrows(() => theme.setWallpaper(``));
  t.throws(() => theme.setWallpaper(1));
  t.throws(() => theme.setWallpaper(Object(``)));
  t.throws(() => theme.setWallpaper());

  t.notThrows(() => theme.set(`foo`, {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  }));
  t.throws(() => theme.set());
  t.throws(() => theme.set(`foo`));
  t.throws(() => theme.set(Object(`foo`), {
    red: 0,
    geeen: 0,
    blue: 0,
    alpha: 0,
  }));
  t.throws(() => theme.set(1, {
    red: 0,
    geeen: 0,
    blue: 0,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    red: -10,
    green: 0,
    blue: 10,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    red: 300,
    green: 0,
    blue: 10,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    red: 1.5,
    green: 0,
    blue: 10,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    red: 1.5,
    green: 0,
    blue: 10,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    green: 0,
    blue: 10,
    alpha: 0,
  }));
  t.throws(() => theme.set(`foo`, {
    red: 100,
    green: 0,
    blue: 10,
    alpha: 0,
    wtf: `??`,
  }));

  t.notThrows(() => theme.get(`foo`));
  t.throws(() => theme.get());
  t.throws(() => theme.get(Object(`foo`)));
  t.throws(() => theme.get(0));

  t.notThrows(() => theme.delete(`foo`));
  t.throws(() => theme.delete());
  t.throws(() => theme.delete(Object(`foo`)));
  t.throws(() => theme.delete(0));

  t.notThrows(() => theme.has(`foo`));
  t.throws(() => theme.has());
  t.throws(() => theme.has(Object(`foo`)));
  t.throws(() => theme.has(0));
});

test(`Copies color values`, (t) => {
  const defaultValues = new Map([
    [`foo`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    }],
  ]);
  const theme = new Attheme(null, {
    defaultValues,
  });

  t.not(theme._variables.get(`foo`), defaultValues.get(`foo`));
  t.not(theme.get(`foo`), theme._variables.get(`foo`));

  const anotherColor = { ...theme._variables.get(`foo`) };

  theme.set(`foo`, anotherColor);
  t.not(theme._variables.get(`foo`), anotherColor);
});
